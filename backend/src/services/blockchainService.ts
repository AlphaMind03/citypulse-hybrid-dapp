import {
  BlockchainRecordRequest,
  BlockchainRecordResponse,
} from "../types/cityPulseTypes";

export const recordCityDataOnBlockchain = async (
  payload: BlockchainRecordRequest
): Promise<BlockchainRecordResponse> => {
  const fakeTransactionId = `TX-${Date.now()}-${payload.city.toUpperCase()}`;

  return {
    success: true,
    message: `City data for ${payload.city} recorded successfully.`,
    txId: fakeTransactionId,
    recordedAt: new Date().toISOString(),
  };
};