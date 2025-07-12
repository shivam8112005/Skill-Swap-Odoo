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

  // Sample data for demonstration
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
      // Simulate API call - replace with actual AI service
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock summary based on length preference
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
      // Simulate API call - replace with actual AI service
      await new Promise((resolve) => setTimeout(resolve, 2500))

      // Mock quiz questions
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

  const clearText = () => {
    setInputText("")
    setSummary("")
    setQuiz([])
    setQuizAnswers({})
    setQuizSubmitted(false)
    setError("")
    setSuccess("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4">
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">AI-Powered Tools</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Text Summarizer & Quiz Generator</h1>
          <p className="text-gray-600 text-lg">Transform your text into concise summaries and interactive quizzes</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab("summarize")}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeTab === "summarize"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Summarize Text</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeTab === "quiz"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Brain className="w-5 h-5" />
              <span>Generate Quiz</span>
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
            <button onClick={() => setError("")} className="ml-auto text-red-600 hover:text-red-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-blue-600" />
                Input Text
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={loadSampleText}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Load Sample</span>
                </button>
                <button
                  onClick={clearText}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here or click 'Load Sample' to try with example content..."
              className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
            <div className="mt-3 text-sm text-gray-500">
              Character count: {inputText.length} | Word count: {inputText.trim().split(/\s+/).filter(Boolean).length}
            </div>
          </div>
        </div>

        {/* Summarize Tab */}
        {activeTab === "summarize" && (
          <div className="space-y-6">
            {/* Summarize Options */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Summary Options</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Summary Length</label>
                  <select
                    value={summaryLength}
                    onChange={(e) => setSummaryLength(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                    <span>{loading ? "Generating Summary..." : "Generate Summary"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Result */}
            {summary && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                      <FileText className="w-6 h-6 mr-3 text-green-600" />
                      Generated Summary
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(summary)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </button>
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <p className="text-gray-800 leading-relaxed text-lg">{summary}</p>
                  </div>
                  <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Generated in ~2 seconds</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>Length: {summaryLength}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            {/* Quiz Options */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quiz Options</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Questions</label>
                  <select
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number.parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  >
                    <option value={3}>3 Questions</option>
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level</label>
                  <select
                    value={quizDifficulty}
                    onChange={(e) => setQuizDifficulty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
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
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Brain className="w-5 h-5" />
                    )}
                    <span>{loading ? "Generating Quiz..." : "Generate Quiz"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quiz Questions */}
            {quiz.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                      <Brain className="w-6 h-6 mr-3 text-purple-600" />
                      Interactive Quiz
                    </h3>
                    {!quizSubmitted && (
                      <div className="flex space-x-2">
                        <button
                          onClick={resetQuiz}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Reset</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {quiz.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">{question.question}</h4>
                          <div className="space-y-3">
                            {question.options.map((option, optionIndex) => {
                              const isSelected = quizAnswers[question.id] === optionIndex
                              const isCorrect = optionIndex === question.correct
                              const showResult = quizSubmitted

                              return (
                                <button
                                  key={optionIndex}
                                  onClick={() => !quizSubmitted && handleQuizAnswer(question.id, optionIndex)}
                                  disabled={quizSubmitted}
                                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                                    showResult
                                      ? isCorrect
                                        ? "bg-green-50 border-green-300 text-green-800"
                                        : isSelected
                                          ? "bg-red-50 border-red-300 text-red-800"
                                          : "bg-gray-50 border-gray-200 text-gray-600"
                                      : isSelected
                                        ? "bg-purple-50 border-purple-300 text-purple-800"
                                        : "bg-gray-50 border-gray-200 hover:bg-purple-50 hover:border-purple-200"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                          {quizSubmitted && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                              <p className="text-blue-800">
                                <strong>Explanation:</strong> {question.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Quiz Actions */}
                  <div className="flex justify-center space-x-4">
                    {!quizSubmitted ? (
                      <button
                        onClick={submitQuiz}
                        disabled={Object.keys(quizAnswers).length !== quiz.length}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        <Play className="w-5 h-5" />
                        <span>Submit Quiz</span>
                      </button>
                    ) : (
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 border border-purple-200">
                          <div className="flex items-center justify-center space-x-3 mb-4">
                            <Award className="w-8 h-8 text-purple-600" />
                            <h3 className="text-2xl font-bold text-gray-800">Quiz Complete!</h3>
                          </div>
                          <div className="text-4xl font-bold text-purple-600 mb-2">
                            {quizScore}/{quiz.length}
                          </div>
                          <p className="text-gray-600 mb-4">
                            You scored {Math.round((quizScore / quiz.length) * 100)}%
                          </p>
                          <div className="flex justify-center space-x-4">
                            <button
                              onClick={resetQuiz}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                            >
                              <RotateCcw className="w-4 h-4" />
                              <span>Retake Quiz</span>
                            </button>
                            <button
                              onClick={handleGenerateQuiz}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                            >
                              <RefreshCw className="w-4 h-4" />
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
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Smart Summarization</h3>
                <p className="text-sm text-gray-600">AI-powered text analysis</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Multiple summary lengths</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Key point extraction</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Copy & download options</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Interactive Quizzes</h3>
                <p className="text-sm text-gray-600">Test comprehension instantly</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Customizable difficulty levels</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Detailed explanations</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
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
