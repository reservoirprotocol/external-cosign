import type { Request, Response } from "express";

import { logger } from "../../common/logger";
import { Wallet } from "@ethersproject/wallet";

export type CoSignRequest = {
  cosigner: string;
  method: "eth_signTypedData_v4"; // eth_sign or more
  params: any[];
}

const cosignKeys = process.env.COSIGNER_PRIVATE_KEYS ? JSON.parse(process.env.COSIGNER_PRIVATE_KEYS) : []
const cosignWallets: Wallet[] = cosignKeys.map((cosignerPrivateKey: string) => new Wallet(cosignerPrivateKey));

export default async (
  request: Request,
  response: Response,
  paramsIn: "query" | "body"
) => {
  const signRequest = request[paramsIn] as CoSignRequest;
  const wallet = cosignWallets.find(c => c.address.toLowerCase() === signRequest.cosigner.toLowerCase());
  if (!wallet) {
    throw new Error("cosigner not exist");
  }

  let signature: string | undefined;
  try {
    if (signRequest.method === "eth_signTypedData_v4") {
      const typedData = signRequest.params[0];
      signature = await wallet._signTypedData(typedData.domain, typedData.types, typedData.message);
    }
  } catch (e) {
    logger.error("cosign", (e as any).toString())
  }
  return response.status(200).send({ signature });
};
