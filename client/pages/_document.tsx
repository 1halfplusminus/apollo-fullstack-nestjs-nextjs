import { ServerStyleSheets } from "@material-ui/core";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { Children } from "react";
import { css, Global } from "@emotion/react";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* PWA primary color */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Global
            styles={css`
              html,
              body,
              #__next {
                min-height: 100%;
                display: flex;
                flex: 1;
              }
              body {
                margin: 0;
                padding: 0;
                font-family: "'Source Sans Pro', sans-serif";
                background: transparent;
              }
              #__next {
                min-width: 100%;
              }
              * {
                box-sizing: "border-box";
              }
            `}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
