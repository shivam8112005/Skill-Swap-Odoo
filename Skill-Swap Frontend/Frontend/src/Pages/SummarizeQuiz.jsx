"use client"

import { useState } from "react"
import {
  FileText,
  Sparkles,
  Brain,
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Target,
  Upload,
  X,
  Play,
  RotateCcw,
  Award,
  Home,
  ArrowLeft,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react"

const SummarizeQuiz = () => {
  const [activeTab, setActiveTab] = useState("summarize")
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [quiz, setQuiz] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [summaryLength, setSummaryLength] = useState("medium")
  const [quizDifficulty, setQuizDifficulty] = useState("medium")
  const [numQuestions, setNumQuestions] = useState(5)

  // Sample text for demonstration
  const sampleText = `Artificial Intelligence (AI) has revolutionized numerous industries and aspects of daily life. Machine learning, a subset of AI, enables computers to learn and improve from experience without being explicitly programmed. Deep learning, which uses neural networks with multiple layers, has been particularly successful in areas like image recognition, natural language processing, and speech recognition.

The applications of AI are vast and growing. In healthcare, AI assists in medical diagnosis, drug discovery, and personalized treatment plans. In finance, it's used for fraud detection, algorithmic trading, and risk assessment. Transportation has seen the emergence of autonomous vehicles, while entertainment platforms use AI for content recommendation.

However, AI also presents challenges. Ethical concerns include bias in algorithms, privacy issues, and the potential displacement of jobs. There's also the question of AI safety and ensuring that advanced AI systems remain beneficial and controllable.

The future of AI looks promising, with ongoing research in areas like quantum computing, neuromorphic chips, and artificial general intelligence. As AI continues to evolve, it's crucial to develop it responsibly, ensuring it benefits humanity while minimizing potential risks.`

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to summarize")
      return
    }

    setLoading(true)
    setError("")
    setSummary("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockSummaries = {
        short:
          "AI has revolutionized industries through machine learning and deep learning. Applications span healthcare, finance, and transportation, but ethical concerns and job displacement remain challenges.",
        medium:
          "Artificial Intelligence, particularly machine learning and deep learning, has transformed industries like healthcare, finance, and transportation. While AI offers benefits in medical diagnosis, fraud detection, and autonomous vehicles, it also presents challenges including algorithmic bias, privacy concerns, and potential job displacement. The future requires responsible AI development.",
        long: "Artificial Intelligence has revolutionized numerous industries through machine learning and deep learning technologies. Applications include healthcare diagnosis, financial fraud detection, and autonomous transportation. However, significant challenges exist including algorithmic bias, privacy issues, and job displacement concerns. Future development focuses on quantum computing and artificial general intelligence, requiring responsible implementation to maximize benefits while minimizing risks to humanity.",
      }

      setSummary(mockSummaries[summaryLength])
      setSuccess("Text summarized successfully!")
    } catch (err) {
      setError("Failed to generate summary. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateQuiz = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to generate quiz from")
      return
    }

    setLoading(true)
    setError("")
    setQuiz([])
    setQuizAnswers({})
    setQuizSubmitted(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const mockQuiz = [
        {
          id: 1,
          question: "What is a subset of AI that enables computers to learn from experience?",
          options: ["Deep Learning", "Machine Learning", "Neural Networks", "Quantum Computing"],
          correct: 1,
          explanation:
            "Machine learning is specifically defined as a subset of AI that enables computers to learn and improve from experience without being explicitly programmed.",
        },
        {
          id: 2,
          question: "Which AI application is mentioned in healthcare?",
          options: ["Autonomous vehicles", "Medical diagnosis", "Algorithmic trading", "Content recommendation"],
          correct: 1,
          explanation:
            "The text specifically mentions that in healthcare, AI assists in medical diagnosis, drug discovery, and personalized treatment plans.",
        },
        {
          id: 3,
          question: "What is one of the main ethical concerns mentioned about AI?",
          options: ["High costs", "Bias in algorithms", "Slow processing", "Limited applications"],
          correct: 1,
          explanation:
            "The text explicitly mentions bias in algorithms as one of the ethical concerns, along with privacy issues and job displacement.",
        },
        {
          id: 4,
          question: "What does deep learning use?",
          options: [
            "Single layer networks",
            "Neural networks with multiple layers",
            "Quantum computers",
            "Traditional algorithms",
          ],
          correct: 1,
          explanation:
            "Deep learning is described as using neural networks with multiple layers, which has been successful in various AI applications.",
        },
        {
          id: 5,
          question: "What is mentioned as important for AI's future development?",
          options: ["Faster computers", "More data", "Responsible development", "Lower costs"],
          correct: 2,
          explanation:
            "The text emphasizes that it's crucial to develop AI responsibly, ensuring it benefits humanity while minimizing potential risks.",
        },
      ].slice(0, numQuestions)

      setQuiz(mockQuiz)
      setSuccess("Quiz generated successfully!")
    } catch (err) {
      setError("Failed to generate quiz. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex,
    })
  }

  const submitQuiz = () => {
    let score = 0
    quiz.forEach((question) => {
      if (quizAnswers[question.id] === question.correct) {
        score++
      }
    })
    setQuizScore(score)
    setQuizSubmitted(true)
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setSuccess("Copied to clipboard!")
    setTimeout(() => setSuccess(""), 2000)
  }

  const loadSampleText = () => {
    setInputText(sampleText)
    setSuccess("Sample text loaded!")
    setTimeout(() => setSuccess(""), 2000)
  }

  const clearAll = () => {
    setInputText("")
    setSummary("")
    setQuiz([])
    setQuizAnswers({})
    setQuizSubmitted(false)
    setError("")
    setSuccess("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-800">AI Tools</h1>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors duration-200">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-semibold">AI-Powered Learning Tools</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Transform Text into <span className="text-blue-600">Knowledge</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to create concise summaries and interactive quizzes from any
            text content
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">Generate summaries in seconds</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">High Accuracy</h3>
            <p className="text-sm text-gray-600">AI-powered precision analysis</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Smart Learning</h3>
            <p className="text-sm text-gray-600">Interactive quiz generation</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab("summarize")}
              className={`flex-1 px-8 py-6 font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                activeTab === "summarize"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <FileText className="w-6 h-6" />
              <span>Text Summarizer</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 px-8 py-6 font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                activeTab === "quiz"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              <Brain className="w-6 h-6" />
              <span>Quiz Generator</span>
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-700 font-medium">{success}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 font-medium">{error}</p>
            <button onClick={() => setError("")} className="ml-auto text-red-600 hover:text-red-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <Upload className="w-8 h-8 mr-4 text-blue-600" />
                Input Your Text
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={loadSampleText}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2 font-medium"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Load Sample</span>
                </button>
                <button
                  onClick={clearAll}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-6 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2 font-medium"
                >
                  <X className="w-5 h-5" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here or click 'Load Sample' to try with example content. The AI will analyze your text and generate summaries or quizzes based on the content..."
              className="w-full h-80 p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none text-lg leading-relaxed"
            />
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex space-x-6">
                <span>Characters: {inputText.length}</span>
                <span>Words: {inputText.trim().split(/\s+/).filter(Boolean).length}</span>
                <span>Lines: {inputText.split("\n").length}</span>
              </div>
              <div className="text-blue-600 font-medium">
                {inputText.length > 100 ? "✓ Ready for processing" : "Need more text for best results"}
              </div>
            </div>
          </div>
        </div>

        {/* Summarize Tab Content */}
        {activeTab === "summarize" && (
          <div className="space-y-8">
            {/* Summarize Options */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Summary Configuration
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Summary Length</label>
                  <select
                    value={summaryLength}
                    onChange={(e) => setSummaryLength(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-lg"
                  >
                    <option value="short">Short (1-2 sentences)</option>
                    <option value="medium">Medium (3-4 sentences)</option>
                    <option value="long">Long (5-6 sentences)</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex items-end">
                  <button
                    onClick={handleSummarize}
                    disabled={loading || !inputText.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-lg"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-6 h-6" />
                    )}
                    <span>{loading ? "Generating Summary..." : "Generate Summary"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Result */}
            {summary && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      <FileText className="w-7 h-7 mr-3 text-green-600" />
                      Generated Summary
                    </h3>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => copyToClipboard(summary)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2 font-medium"
                      >
                        <Copy className="w-5 h-5" />
                        <span>Copy</span>
                      </button>
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2 font-medium">
                        <Download className="w-5 h-5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
                    <p className="text-gray-800 leading-relaxed text-xl font-medium">{summary}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Generated in ~2 seconds</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Length: {summaryLength}</span>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">✓ Summary Complete</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab Content */}
        {activeTab === "quiz" && (
          <div className="space-y-8">
            {/* Quiz Options */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-3 text-purple-600" />
                Quiz Configuration
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Number of Questions</label>
                  <select
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number.parseInt(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-lg"
                  >
                    <option value={3}>3 Questions</option>
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Difficulty Level</label>
                  <select
                    value={quizDifficulty}
                    onChange={(e) => setQuizDifficulty(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none text-lg"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleGenerateQuiz}
                    disabled={loading || !inputText.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-lg"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Brain className="w-6 h-6" />
                    )}
                    <span>{loading ? "Generating Quiz..." : "Generate Quiz"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quiz Questions */}
            {quiz.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                      <Brain className="w-7 h-7 mr-3 text-purple-600" />
                      Interactive Quiz
                    </h3>
                    {!quizSubmitted && (
                      <div className="flex space-x-3">
                        <button
                          onClick={resetQuiz}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2 font-medium"
                        >
                          <RotateCcw className="w-5 h-5" />
                          <span>Reset</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {quiz.map((question, index) => (
                    <div key={question.id} className="border-2 border-gray-200 rounded-2xl p-8">
                      <div className="flex items-start space-x-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold text-lg">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h4>
                          <div className="space-y-4">
                            {question.options.map((option, optionIndex) => {
                              const isSelected = quizAnswers[question.id] === optionIndex
                              const isCorrect = optionIndex === question.correct
                              const showResult = quizSubmitted

                              return (
                                <button
                                  key={optionIndex}
                                  onClick={() => !quizSubmitted && handleQuizAnswer(question.id, optionIndex)}
                                  disabled={quizSubmitted}
                                  className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 text-lg ${
                                    showResult
                                      ? isCorrect
                                        ? "bg-green-50 border-green-300 text-green-800"
                                        : isSelected
                                          ? "bg-red-50 border-red-300 text-red-800"
                                          : "bg-gray-50 border-gray-200 text-gray-600"
                                      : isSelected
                                        ? "bg-purple-50 border-purple-300 text-purple-800 shadow-lg"
                                        : "bg-gray-50 border-gray-200 hover:bg-purple-50 hover:border-purple-200"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{option}</span>
                                    {showResult && isCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                          {quizSubmitted && (
                            <div className="mt-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                              <p className="text-blue-800 text-lg">
                                <strong>Explanation:</strong> {question.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Quiz Actions */}
                  <div className="flex justify-center space-x-6">
                    {!quizSubmitted ? (
                      <button
                        onClick={submitQuiz}
                        disabled={Object.keys(quizAnswers).length !== quiz.length}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 text-lg"
                      >
                        <Play className="w-6 h-6" />
                        <span>Submit Quiz</span>
                      </button>
                    ) : (
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-3xl p-12 border-2 border-purple-200">
                          <div className="flex items-center justify-center space-x-4 mb-6">
                            <Award className="w-12 h-12 text-purple-600" />
                            <h3 className="text-3xl font-bold text-gray-800">Quiz Complete!</h3>
                          </div>
                          <div className="text-6xl font-bold text-purple-600 mb-4">
                            {quizScore}/{quiz.length}
                          </div>
                          <p className="text-xl text-gray-600 mb-8">
                            You scored {Math.round((quizScore / quiz.length) * 100)}%
                          </p>
                          <div className="flex justify-center space-x-6">
                            <button
                              onClick={resetQuiz}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2 font-bold"
                            >
                              <RotateCcw className="w-5 h-5" />
                              <span>Retake Quiz</span>
                            </button>
                            <button
                              onClick={handleGenerateQuiz}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2 font-bold"
                            >
                              <RefreshCw className="w-5 h-5" />
                              <span>New Quiz</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features Overview */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Smart Summarization</h3>
                <p className="text-gray-600">AI-powered text analysis</p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Multiple summary lengths</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Key point extraction</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Copy & download options</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Interactive Quizzes</h3>
                <p className="text-gray-600">Test comprehension instantly</p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Customizable difficulty levels</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Detailed explanations</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Instant scoring & feedback</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummarizeQuiz
