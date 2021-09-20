import unified from 'unified';
import parse from 'rehype-parse';
import rehype2remark from 'rehype-remark';
import stringify from 'remark-stringify';

const convert = async (html) => {
  const processor = unified()
    .use(parse, { emitParseErrors: true })
    .use(rehype2remark)
    .use(stringify, {
      bullet: '-',
      fence: '`',
      fences: true,
      incrementListMarker: true,
      rule: '-',
      ruleRepetition: 3,
      ruleSpaces: false,
    });

  const file = await processor.process(html);
  let contents = file.contents.toString();

  return contents;
}

export {
  convert
};