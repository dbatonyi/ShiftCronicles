import "../styles/output.css";
import Layout from "../layouts/Layout";

function MyApp({ Component, pageProps, ...AppProps }) {
  if (["/installer"].includes(AppProps.router.pathname)) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
