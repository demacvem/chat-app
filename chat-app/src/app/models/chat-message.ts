export class ChatMessage {
    $key?: string;
    email?: string;
    userName?: string;
    message?: string;
    timeSend?: Date = new Date();
}