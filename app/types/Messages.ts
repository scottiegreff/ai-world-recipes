type Messages = {
  id: string;
  tool_call_id?: string;
  createdAt?: Date;
  content: string;
  ui?: string | JSX.Element | JSX.Element[] | null | undefined;
  role: "system" | "user" | "assistant" | "function" | "data" | "tool";
};
export default Messages;
