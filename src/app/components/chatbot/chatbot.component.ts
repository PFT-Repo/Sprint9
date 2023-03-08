import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  apiUrl = 'https://api.openai.com/v1/chat/completions';
  apiKey = environment.OpenApi;
  messages: { text: string, timestamp: Date, bot?: boolean }[] = [];
  newMessage = '';

  constructor(private http: HttpClient) { }

  sendMessage() {
    const message = { text: this.newMessage, timestamp: new Date() };
    this.messages.push(message);
    this.newMessage = '';
    this.getBotResponse(message.text);
  }

  getBotResponse(message: string) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiKey}` };
    const messages= [{role: "user", content:message}];
    const prompt = `${message}\nBot:`;
    const data = { model: 'gpt-3.5-turbo',messages};
    this.http.post<any>(this.apiUrl, data, { headers: headers }).subscribe(response => {
      const message = { text: '\n'+ response.choices[0].message.content, timestamp: new Date(),bot:true };
      this.messages.push(message);
    });
  }
}