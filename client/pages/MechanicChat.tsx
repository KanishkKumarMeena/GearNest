import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Paperclip, 
  Camera, 
  Phone, 
  Video, 
  MoreVertical,
  Star,
  Clock,
  Undo2,
  Image as ImageIcon,
  X
} from "lucide-react";
import { useState, useRef } from "react";

interface Message {
  id: string;
  sender: 'user' | 'mechanic';
  content: string;
  timestamp: Date;
  type: 'text' | 'image';
  imageUrl?: string;
  canUndo?: boolean;
}

interface Mechanic {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  specialties: string[];
  status: 'online' | 'busy' | 'offline';
  responseTime: string;
}

export default function MechanicChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'mechanic',
      content: "Hi! I'm Jake, your automotive expert. I see you're looking for brake pads for a 2020 Honda Accord. I can help you find the perfect fit and answer any installation questions!",
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: '2',
      sender: 'user',
      content: "Yes, I need brake pads and I'm not sure if I should go with OEM or aftermarket options.",
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    },
    {
      id: '3',
      sender: 'mechanic',
      content: "Great question! For your Accord, I'd recommend the Akebono pads we have in stock. They're OEM quality but at a better price point. Would you like me to show you some options?",
      timestamp: new Date(Date.now() - 180000),
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mechanic: Mechanic = {
    id: '1',
    name: 'Jake Martinez',
    avatar: '/placeholder.svg',
    rating: 4.9,
    specialties: ['Honda', 'Toyota', 'Brake Systems', 'Engine Repair'],
    status: 'online',
    responseTime: '< 2 min avg'
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedImages.length > 0) {
      // Send text message
      if (newMessage.trim()) {
        const textMessage: Message = {
          id: Date.now().toString(),
          sender: 'user',
          content: newMessage,
          timestamp: new Date(),
          type: 'text',
          canUndo: true
        };
        setMessages(prev => [...prev, textMessage]);
      }

      // Send image messages
      selectedImages.forEach((image, index) => {
        const imageMessage: Message = {
          id: `${Date.now()}_${index}`,
          sender: 'user',
          content: `Shared image: ${image.name}`,
          timestamp: new Date(),
          type: 'image',
          imageUrl: URL.createObjectURL(image),
          canUndo: true
        };
        setMessages(prev => [...prev, imageMessage]);
      });

      setNewMessage('');
      setSelectedImages([]);

      // Simulate mechanic response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1000).toString(),
          sender: 'mechanic',
          content: "Thanks for sharing that! I can see the issue clearly. Let me recommend the best solution for you.",
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
  };

  const removeSelectedImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const undoMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Chat Header */}
        <Card className="rounded-none border-l-0 border-r-0 border-t-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mechanic.avatar} />
                    <AvatarFallback>
                      {mechanic.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                    mechanic.status === 'online' ? 'bg-green-500' : 
                    mechanic.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold">{mechanic.name}</h2>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{mechanic.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{mechanic.responseTime}</span>
                    <span>•</span>
                    <span className="capitalize">{mechanic.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mechanic.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[70%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender === 'mechanic' ? mechanic.avatar : ''} />
                    <AvatarFallback>
                      {message.sender === 'mechanic' 
                        ? mechanic.name.split(' ').map(n => n[0]).join('')
                        : 'You'
                      }
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`space-y-1 ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      {message.type === 'image' && message.imageUrl ? (
                        <div className="space-y-2">
                          <img
                            src={message.imageUrl}
                            alt="Shared image"
                            className="max-w-48 max-h-48 rounded-lg object-cover"
                          />
                          <p className="text-sm">{message.content}</p>
                        </div>
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </div>
                    
                    <div className={`flex items-center gap-2 text-xs text-muted-foreground ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <span>{formatTime(message.timestamp)}</span>
                      {message.canUndo && message.sender === 'user' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => undoMessage(message.id)}
                          className="h-auto p-1 text-xs"
                        >
                          <Undo2 className="h-3 w-3 mr-1" />
                          Undo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Image Preview */}
        {selectedImages.length > 0 && (
          <div className="p-4 border-t bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Selected Images ({selectedImages.length}/5)</span>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSelectedImage(index)}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <Card className="rounded-none border-l-0 border-r-0 border-b-0">
          <CardContent className="p-4">
            <div className="flex items-end gap-2">
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={selectedImages.length >= 5}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={selectedImages.length >= 5}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <Input
                  placeholder="Type your message or ask a question..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  className="resize-none"
                />
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim() && selectedImages.length === 0}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground">
              Press Enter to send, Shift+Enter for new line
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
