export interface InquiryPayload {
  name: string;
  email: string;
  message: string;
  modelId: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
  const { name, email, message, modelId } = payload;

  if (!name || !email || !message || !modelId) {
    throw new Error("Missing required fields");
  }

  console.log("New inquiry received:", {
    ...payload,
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    message: "Inquiry submitted successfully",
  };
}

