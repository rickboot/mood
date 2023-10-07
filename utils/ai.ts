import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { Document as LangChainDocument } from 'langchain/document';
import { PromptTemplate } from 'langchain/prompts';
import { loadQARefineChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { z } from 'zod';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    summary: z.string().describe('short summary of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the overall mood of the journal entry negative (i.e. does it contain mostly negative emotions?'
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color code in #RRGGBB format that represents the mood of the journal entry. Example #0102fe for blue to represent happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
  })
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions. No matter what!\n {format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyzeEntry = async (content: string) => {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const input = await getPrompt(content);
  let output = await model.call(input);

  try {
    return parser.parse(output);
  } catch (e) {
    console.log(e);
  }
};

export const qa = async (question: string, entries) => {
  const docs = entries.map(
    (entry) =>
      new LangChainDocument({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  );

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await vectorStore.similaritySearch(question);

  const result = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  return result.output_text;
};
