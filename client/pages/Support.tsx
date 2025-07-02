import { Header } from "@/components/marketplace/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  HelpCircle,
  Search,
  BookOpen,
  Wrench,
  ShoppingCart,
  User,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: number;
}

export default function Support() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string>('');

  const supportCategories: SupportCategory[] = [
    {
      id: 'ordering',
      title: 'Ordering & Payment',
      description: 'Help with placing orders, payment methods, and checkout issues',
      icon: <ShoppingCart className="h-6 w-6" />,
      articles: 15
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      description: 'Track orders, shipping options, and delivery information',
      icon: <MapPin className="h-6 w-6" />,
      articles: 12
    },
    {
      id: 'parts',
      title: 'Parts & Compatibility',
      description: 'Find the right parts, compatibility checks, and installation guides',
      icon: <Wrench className="h-6 w-6" />,
      articles: 28
    },
    {
      id: 'account',
      title: 'Account & Profile',
      description: 'Manage your account, profile settings, and saved items',
      icon: <User className="h-6 w-6" />,
      articles: 8
    }
  ];

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I know if a part is compatible with my vehicle?',
      answer: 'Our compatibility checker uses your vehicle\'s VIN or year/make/model to ensure parts fit perfectly. Look for the "Fit Verified" badge on compatible parts. You can also chat with our mechanics for expert advice.',
      category: 'parts'
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and financing options through Affirm for qualified purchases.',
      category: 'ordering'
    },
    {
      id: '3',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in real-time through your account dashboard or our order tracking page.',
      category: 'shipping'
    },
    {
      id: '4',
      question: 'Do you offer installation guides?',
      answer: 'Yes! We provide detailed installation guides, video tutorials, and access to certified mechanics through our chat feature. Many parts also include manufacturer installation instructions.',
      category: 'parts'
    },
    {
      id: '5',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused parts in original packaging. Installation is not required to return a part. Some restrictions apply to electrical and custom parts.',
      category: 'ordering'
    },
    {
      id: '6',
      question: 'How do I change my shipping address?',
      answer: 'You can update your shipping address in your account profile. For orders already placed, contact our support team immediately as changes may not be possible once processing begins.',
      category: 'account'
    }
  ];

  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get answers to your questions, find installation guides, or contact our expert team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for help articles, guides, or common questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our mechanics and support team
              </p>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Average response: 2 minutes
              </Badge>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Speak directly with our support team
              </p>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Mon-Fri 8AM-8PM EST
              </Badge>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Call (555) 123-GEAR
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us a detailed message
              </p>
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                Response within 24 hours
              </Badge>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Support Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Browse Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer hover:shadow-lg transition-all ${
                  selectedCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-primary mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    <Badge variant="secondary">{category.articles} articles</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            {selectedCategory && (
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory('')}
                className="text-sm"
              >
                Show All FAQs
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent 
                  className="p-6"
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? '' : faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{faq.question}</h3>
                      {expandedFAQ !== faq.id && (
                        <p className="text-muted-foreground text-sm line-clamp-1">
                          Click to see the answer...
                        </p>
                      )}
                    </div>
                    <ChevronRight 
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        expandedFAQ === faq.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                  
                  {expandedFAQ === faq.id && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or browse our help categories
              </p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-xl">Still need help?</CardTitle>
            <p className="text-muted-foreground">
              Send us a message and we'll get back to you within 24 hours
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Your full name" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input id="subject" placeholder="Brief description of your issue" />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <select className="w-full p-2 border rounded-md bg-background">
                <option value="">Select a category</option>
                <option value="ordering">Ordering & Payment</option>
                <option value="shipping">Shipping & Delivery</option>
                <option value="parts">Parts & Compatibility</option>
                <option value="account">Account & Profile</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea 
                id="message" 
                placeholder="Please describe your issue in detail. Include any relevant order numbers, part numbers, or error messages."
                rows={6}
              />
            </div>
            
            <div className="flex gap-4">
              <Button className="flex-1">Send Message</Button>
              <Button variant="outline">Attach Files</Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Installation Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Step-by-step guides and video tutorials for common auto part installations
              </p>
              <Button variant="outline" className="w-full">
                Browse Guides
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Service Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 8:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="pt-2 mt-4 border-t">
                  <p className="text-muted-foreground">
                    Live chat and email support available 24/7
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
