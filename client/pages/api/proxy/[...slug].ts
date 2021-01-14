import withSession from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Session } from "next-iron-session";

export const config = {
  api: {
    bodyParser: false,
  },
};
// Create proxy instance outside of request handler function to avoid unnecessary re-creation
export default withSession(
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
    pathRewrite: { [`^/api/proxy`]: "" },
    secure: false,
    selfHandleResponse: true,
    onProxyReq: (
      proxyReq,
      req: NextApiRequest & { session: Session },
      res: NextApiResponse
    ) => {
      if (req.session.get("user")?.token) {
        proxyReq.setHeader(
          "authorization",
          `Bearer ${req.session.get("user")?.token}`
        );
      }
    },
    onProxyRes: (
      proxyRes,
      req: NextApiRequest & { session: Session },
      res: NextApiResponse
    ) => {
      let resBody = "";
      proxyRes.on("data", function (data) {
        data = data.toString("utf-8");
        resBody += data;
      });
      proxyRes.on("end", async () => {
        const response = JSON.parse(resBody);
        if (response?.data?.login?.token) {
          req.session.set("user", response?.data?.login);
          await req.session.save();
        }
        res.write(resBody);
        res.end();
      });
    },
  })
);
