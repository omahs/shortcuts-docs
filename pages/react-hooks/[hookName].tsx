import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

const REACT_HOOKS_DOCS = "https://use-defi-docs.s3.amazonaws.com";

export const getStaticPaths: GetStaticPaths = async () => {
  const routes = await fetch(`${REACT_HOOKS_DOCS}/routes.json`);
  const hooks = await routes.json();

  return {
    paths: hooks.map((hookName) => ({
      params: {
        hookName,
      },
    })),
    fallback: true, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps<{
  source: MDXRemoteSerializeResult;
}> = async (context) => {
  console.log(context.params);
  const res = await fetch(`${REACT_HOOKS_DOCS}/${context.params.hookName}`);
  const mdxData = await res.text();

  // MDX text - can be from a local file, database, anywhere
  const source = "Some **mdx** text, with a component <Test />";
  const mdxSource = await serialize(mdxData);
  return { props: { source: mdxSource } };
};

export default function Page({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <MDXRemote {...source} />;
}
