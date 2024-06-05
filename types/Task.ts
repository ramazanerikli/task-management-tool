export default interface Task {
  id: string;
  text: string;
  status: "active" | "completed";
}
