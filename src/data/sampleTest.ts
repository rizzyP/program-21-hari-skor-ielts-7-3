
import { IELTSTest } from "@/types/test";

export const sampleTest: IELTSTest = {
  id: "test-001",
  title: "IELTS Academic Test Sample",
  sections: [
    {
      id: "listening-001",
      type: "listening",
      title: "Listening Test",
      timeInMinutes: 30,
      content: {
        audioUrl: "/audio/listening-sample.mp3", // This would be a real audio file in a production app
        sections: [
          {
            title: "Section 1",
            questions: [
              {
                id: "l-q1",
                questionText: "What is the woman's name?",
                questionType: "multiple-choice",
                options: ["Sarah Johnson", "Sarah Thompson", "Sarah Williams", "Sarah Davis"],
                correctAnswer: "Sarah Thompson"
              },
              {
                id: "l-q2",
                questionText: "What is the woman's phone number?",
                questionType: "fill-in-blank",
                correctAnswer: "0468932157"
              },
              {
                id: "l-q3",
                questionText: "What type of accommodation is the woman looking for?",
                questionType: "multiple-choice",
                options: ["Studio apartment", "One-bedroom apartment", "Shared house", "Two-bedroom apartment"],
                correctAnswer: "One-bedroom apartment"
              },
              {
                id: "l-q4",
                questionText: "What is the woman's budget per week?",
                questionType: "multiple-choice",
                options: ["$250", "$300", "$350", "$400"],
                correctAnswer: "$300"
              },
              {
                id: "l-q5",
                questionText: "Which suburb does the woman prefer?",
                questionType: "multiple-choice",
                options: ["Richmond", "Carlton", "Brunswick", "Fitzroy"],
                correctAnswer: "Carlton"
              },
            ]
          },
          {
            title: "Section 2",
            questions: [
              {
                id: "l-q6",
                questionText: "What is the name of the university campus being described?",
                questionType: "fill-in-blank",
                correctAnswer: "Westside Campus"
              },
              {
                id: "l-q7",
                questionText: "How many students study at the campus?",
                questionType: "multiple-choice",
                options: ["5,000", "8,000", "12,000", "15,000"],
                correctAnswer: "12,000"
              },
              {
                id: "l-q8",
                questionText: "Match the building with its location on campus.",
                questionType: "matching",
                options: ["Library", "Student Center", "Science Building", "Arts Center"],
                matches: ["North", "South", "East", "West"],
                correctMatches: {
                  "Library": "North",
                  "Student Center": "South",
                  "Science Building": "West",
                  "Arts Center": "East"
                }
              },
              {
                id: "l-q9",
                questionText: "What time does the library open on weekdays?",
                questionType: "multiple-choice",
                options: ["7:00 AM", "8:00 AM", "8:30 AM", "9:00 AM"],
                correctAnswer: "8:00 AM"
              },
              {
                id: "l-q10",
                questionText: "What is the name of the café in the student center?",
                questionType: "fill-in-blank",
                correctAnswer: "The Brew House"
              },
            ]
          }
        ]
      }
    },
    {
      id: "reading-001",
      type: "reading",
      title: "Reading Test",
      timeInMinutes: 20,
      content: {
        passage: `# The Impact of Technology on Modern Education

Technology has dramatically changed the landscape of education in the 21st century. From interactive whiteboards to online learning platforms, digital tools have transformed how students learn and how teachers teach. This shift has been particularly evident in higher education, where many institutions now offer a blend of traditional and online courses.

One of the most significant advantages of technology in education is the increased accessibility it provides. Students can access learning materials, lectures, and resources from anywhere with an internet connection, making education more flexible and accommodating for those with various commitments or learning styles. Digital repositories of books and research papers have also democratized access to knowledge that was previously confined to physical libraries.

However, this technological revolution is not without its challenges. The digital divide—the gap between those who have access to technology and those who do not—remains a significant concern. Students from lower socio-economic backgrounds may not have access to the necessary devices or reliable internet connections, potentially creating an uneven playing field. Additionally, the overreliance on screens has raised concerns about reduced attention spans and the loss of important social skills that are developed through face-to-face interaction.

Moreover, the integration of technology in education requires significant investment in training for educators. Many teachers are not digital natives and may struggle to adapt to new teaching methods that incorporate technology. Without proper support, there's a risk that digital tools might be underutilized or misused, diminishing their potential benefits.

Despite these challenges, the potential of technology to enhance educational experiences is undeniable. Adaptive learning systems can personalize education to meet the specific needs of individual students, offering tailored exercises and feedback. Virtual reality can transport students to different times and places, providing immersive learning experiences that were previously unimaginable. Collaborative tools enable students from different parts of the world to work together, fostering global perspectives and cross-cultural understanding.

As we move forward, it is essential to strike a balance between embracing the opportunities that technology offers and addressing the challenges it presents. By doing so, we can harness the power of digital innovation to create more inclusive, engaging, and effective educational experiences for all students.`,
        questions: [
          {
            id: "r-q1",
            questionText: "According to the passage, what is one of the most significant advantages of technology in education?",
            questionType: "multiple-choice",
            options: [
              "Reduced costs for educational institutions",
              "Increased accessibility to learning materials",
              "Elimination of the need for teachers",
              "Simplified curriculum development"
            ],
            correctAnswer: "Increased accessibility to learning materials"
          },
          {
            id: "r-q2",
            questionText: "The digital divide refers to:",
            questionType: "multiple-choice",
            options: [
              "The gap between traditional and online learning methods",
              "The difference between educational software and hardware",
              "The gap between those with and without access to technology",
              "The disparity between teachers' and students' technological skills"
            ],
            correctAnswer: "The gap between those with and without access to technology"
          },
          {
            id: "r-q3",
            questionText: "Which of the following is NOT mentioned as a challenge of incorporating technology in education?",
            questionType: "multiple-choice",
            options: [
              "The digital divide",
              "Reduced attention spans",
              "Increased educational costs",
              "Need for teacher training"
            ],
            correctAnswer: "Increased educational costs"
          },
          {
            id: "r-q4",
            questionText: "The passage suggests that effective integration of technology in education requires:",
            questionType: "multiple-choice",
            options: [
              "Replacing all traditional teaching methods",
              "Investing in training for educators",
              "Making technology mandatory for all students",
              "Focusing exclusively on digital learning platforms"
            ],
            correctAnswer: "Investing in training for educators"
          },
          {
            id: "r-q5",
            questionText: "According to the passage, adaptive learning systems can:",
            questionType: "multiple-choice",
            options: [
              "Replace teachers entirely",
              "Solve the digital divide",
              "Personalize education for individual needs",
              "Eliminate the need for examinations"
            ],
            correctAnswer: "Personalize education for individual needs"
          },
          {
            id: "r-q6",
            questionText: "The author's overall view on technology in education can be described as:",
            questionType: "multiple-choice",
            options: [
              "Highly critical",
              "Cautiously optimistic",
              "Completely negative",
              "Unreservedly enthusiastic"
            ],
            correctAnswer: "Cautiously optimistic"
          },
          {
            id: "r-q7",
            questionText: "The passage states that virtual reality can help students by:",
            questionType: "multiple-choice",
            options: [
              "Eliminating the need for classroom attendance",
              "Providing immersive learning experiences",
              "Replacing traditional textbooks",
              "Improving their programming skills"
            ],
            correctAnswer: "Providing immersive learning experiences"
          },
          {
            id: "r-q8",
            questionText: "According to the passage, collaborative tools in education can foster:",
            questionType: "multiple-choice",
            options: [
              "Competition among students",
              "Global perspectives and cross-cultural understanding",
              "Reliance on technology",
              "Simplified assessment methods"
            ],
            correctAnswer: "Global perspectives and cross-cultural understanding"
          },
          {
            id: "r-q9",
            questionText: "The passage implies that many teachers may struggle with technology because:",
            questionType: "multiple-choice",
            options: [
              "They are resistant to change",
              "Educational technology is too complex",
              "They are not digital natives",
              "They fear being replaced by technology"
            ],
            correctAnswer: "They are not digital natives"
          },
          {
            id: "r-q10",
            questionText: "The author concludes that the future of technology in education should involve:",
            questionType: "multiple-choice",
            options: [
              "Completely replacing traditional methods",
              "Focusing on cost-saving benefits",
              "Balancing opportunities and challenges",
              "Limiting technology use in early education"
            ],
            correctAnswer: "Balancing opportunities and challenges"
          }
        ]
      }
    },
    {
      id: "writing-001",
      type: "writing",
      title: "Writing Test",
      timeInMinutes: 60,
      content: {
        tasks: [
          {
            id: "w-task1",
            taskNumber: 1,
            prompt: "The graph below shows the proportion of the population aged 65 and over in three different countries from 1940 to 2040. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
            wordCount: 150,
            timeInMinutes: 20,
            resources: "/images/sample-chart.svg" // This would be a real image in a production app
          },
          {
            id: "w-task2",
            taskNumber: 2,
            prompt: "Some people believe that university students should pay all the costs of their studies because they will earn a higher salary after graduation. Others believe that university education should be free. Discuss both views and give your own opinion.",
            wordCount: 250,
            timeInMinutes: 40
          }
        ]
      }
    },
    {
      id: "speaking-001",
      type: "speaking",
      title: "Speaking Test",
      timeInMinutes: 14,
      content: {
        parts: [
          {
            id: "sp-part1",
            partNumber: 1,
            introduction: "In this part, the examiner will ask you general questions about yourself and familiar topics such as your home, family, work, studies, and interests.",
            questions: [
              "Could you tell me your full name, please?",
              "Can I see your identification, please?",
              "Do you work or are you a student?",
              "What do you enjoy most about your studies/work?",
              "Let's talk about your hometown. What is special about your hometown?",
              "Has your hometown changed much since you were a child?",
              "Let's move on to talk about music. Do you like listening to music?",
              "What type of music do you enjoy listening to?",
              "When do you usually listen to music?",
              "Do you think the type of music a person listens to tells you something about their personality?"
            ],
            timeInMinutes: 4
          },
          {
            id: "sp-part2",
            partNumber: 2,
            introduction: "In this part, I'm going to give you a topic and I'd like you to talk about it for 1 to 2 minutes. Before you talk, you'll have 1 minute to prepare what you're going to say. Here's some paper and a pencil to make notes if you wish.",
            questions: [
              "Describe a teacher who has influenced you in your education. You should say: who this teacher was, what subject they taught, what was special about this teacher, and explain why this person has influenced you so much."
            ],
            timeInMinutes: 3,
            preparationTimeInSeconds: 60
          },
          {
            id: "sp-part3",
            partNumber: 3,
            introduction: "We've been talking about a teacher who influenced you. Now I'd like to discuss with you some more general questions related to this topic.",
            questions: [
              "What are the qualities of a good teacher?",
              "Do you think the role of teachers has changed in recent years?",
              "How important are teachers compared to parents in educating children?",
              "Some people think that computers will eventually replace teachers. What's your opinion?"
            ],
            timeInMinutes: 7
          }
        ]
      }
    }
  ]
};
