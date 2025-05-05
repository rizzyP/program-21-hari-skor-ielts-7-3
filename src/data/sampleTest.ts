import { IELTSTest } from "@/types/test";

export const sampleTest: IELTSTest = {
  id: "test-001",
  title: "IELTS Academic Test Sample",
  sections: [
    {
      id: "listening-001",
      type: "listening",
      title: "Listening Test",
      timeInMinutes: 10,
      content: {
        audioUrl: "/audio/listening-sample.mp3", // This would be a real audio file in a production app
        sections: [
          {
            title: "Section 1: Southmead Art College Courses",
            questions: [
              {
                id: "l-q1",
                questionText: "Which five courses are available? Choose from options A-I. Course 1:",
                questionType: "multiple-choice",
                options: [
                  "A. Fibre Art classes", 
                  "B. Oil Painting classes", 
                  "C. Digital Art classes", 
                  "D. Print making classes", 
                  "E. Fine Art classes",
                  "F. Photography classes",
                  "G. Weekend courses",
                  "H. Ceramic and Pottery classes",
                  "I. Jewellery design classes"
                ],
                correctAnswer: "B. Oil Painting classes"
              },
              {
                id: "l-q2",
                questionText: "Which five courses are available? Choose from options A-I. Course 2:",
                questionType: "multiple-choice",
                options: [
                  "A. Fibre Art classes", 
                  "B. Oil Painting classes", 
                  "C. Digital Art classes", 
                  "D. Print making classes", 
                  "E. Fine Art classes",
                  "F. Photography classes",
                  "G. Weekend courses",
                  "H. Ceramic and Pottery classes",
                  "I. Jewellery design classes"
                ],
                correctAnswer: "D. Print making classes"
              },
              {
                id: "l-q3",
                questionText: "Which five courses are available? Choose from options A-I. Course 3:",
                questionType: "multiple-choice",
                options: [
                  "A. Fibre Art classes", 
                  "B. Oil Painting classes", 
                  "C. Digital Art classes", 
                  "D. Print making classes", 
                  "E. Fine Art classes",
                  "F. Photography classes",
                  "G. Weekend courses",
                  "H. Ceramic and Pottery classes",
                  "I. Jewellery design classes"
                ],
                correctAnswer: "C. Digital Art classes"
              },
              {
                id: "l-q4",
                questionText: "Which five courses are available? Choose from options A-I. Course 4:",
                questionType: "multiple-choice",
                options: [
                  "A. Fibre Art classes", 
                  "B. Oil Painting classes", 
                  "C. Digital Art classes", 
                  "D. Print making classes", 
                  "E. Fine Art classes",
                  "F. Photography classes",
                  "G. Weekend courses",
                  "H. Ceramic and Pottery classes",
                  "I. Jewellery design classes"
                ],
                correctAnswer: "F. Photography classes"
              },
              {
                id: "l-q5",
                questionText: "Which five courses are available? Choose from options A-I. Course 5:",
                questionType: "multiple-choice",
                options: [
                  "A. Fibre Art classes", 
                  "B. Oil Painting classes", 
                  "C. Digital Art classes", 
                  "D. Print making classes", 
                  "E. Fine Art classes",
                  "F. Photography classes",
                  "G. Weekend courses",
                  "H. Ceramic and Pottery classes",
                  "I. Jewellery design classes"
                ],
                correctAnswer: "I. Jewellery design classes"
              },
            ]
          },
          {
            title: "Section 1: Enrolment Plans",
            questions: [
              {
                id: "l-q6",
                questionText: "Complete the notes about Enrolment Plan 5: How many evening courses?",
                questionType: "fill-in-blank",
                correctAnswer: "Two"
              },
              {
                id: "l-q7",
                questionText: "Complete the notes about Enrolment Plan 3: What is the basic fee?",
                questionType: "fill-in-blank",
                correctAnswer: "$375"
              },
              {
                id: "l-q8",
                questionText: "Complete the notes about Enrolment Plan 2: What is the basic fee?",
                questionType: "fill-in-blank",
                correctAnswer: "$245"
              },
              {
                id: "l-q9",
                questionText: "Complete the notes about Enrolment Plan 2: Enrol before which date of this month?",
                questionType: "fill-in-blank",
                correctAnswer: "23rd"
              },
              {
                id: "l-q10",
                questionText: "Complete the notes about Enrolment Plan 2: What is the contact name?",
                questionType: "fill-in-blank",
                correctAnswer: "Carol Pearstone"
              }
            ]
          },
          {
            title: "Section 4: Changes in the Art World",
            questions: [
              {
                id: "l-q11",
                questionText: "Digital technology has made the _________ 'high art' and 'popular culture' less clear.",
                questionType: "fill-in-blank",
                correctAnswer: "line between"
              },
              {
                id: "l-q12",
                questionText: "New art collectors are moving the _________ away from the US and Europe.",
                questionType: "fill-in-blank",
                correctAnswer: "centres of gravity"
              },
              {
                id: "l-q13",
                questionText: "Traditional definitions of 'high art' contained strong connections to _________.",
                questionType: "fill-in-blank",
                correctAnswer: "wealth and elitism"
              },
              {
                id: "l-q14",
                questionText: "Contemporary art seems outside _________ of previous definitions.",
                questionType: "fill-in-blank",
                correctAnswer: "the boundaries"
              },
              {
                id: "l-q15",
                questionText: "Art nationality is more difficult to define due to easier movement of artists _________.",
                questionType: "fill-in-blank",
                correctAnswer: "around the world"
              }
            ]
          }
        ]
      }
    },
    {
      id: "reading-academic-001",
      type: "reading",
      title: "Reading Test (Academic)",
      timeInMinutes: 15,
      content: {
        passage: `# Flower Power

Alexandria in Virginia, USA, and particularly its well-tended Old Town section, is the sort of upscale suburb that rings most major American cities. From the array of pubs, sushi-restaurant chains and pasta joints that line its streets, you would never guess that within 20 minutes you can find some of the best Korean, Vietnamese, Chinese, Pakistani or Bolivian food in America. Its 18th-century homes have been carefully maintained; now that the nasty, dirty business of living in them is done, they are at last free to house upscale boutiques selling ornate pepper-shakers, local wine, birthday cakes for dogs and other essentials. Yet this suburb was a city before cars existed, making it especially dense, walkable and charming. It has also turned an instrument of war into an instrument of art.

The day after the armistice that ended the first world war in 1918, the United States Navy began building the US Naval Torpedo station on the waterfront across the Potomac and just downriver from the Naval Research Laboratory in south-west Washington, DC. After a brief period of production, it stored munitions between the wars. When the second world war broke out, it built torpedoes for submarines and aircraft; when that war ended, the building was again used for storage. In 1969, the local Alexandria government bought the site, which had grown to comprise 11 buildings, from the federal government.

Five years later, after all the debris was removed and walls erected, the main building was refitted to house artists' studios. A quarter-century, and several extensive renovations, later the artists are still there: over 160 of them sharing 82 studios, six galleries and two workshops. The Art League School and the Alexandria Archaeology Museum also share the space, bringing in thousands more aspirants and students. All of this makes the Torpedo Factory, as it is now called, a low-key, family-friendly and craft-centred alternative to the many worthy galleries across the river.

The building is three-storeys tall; on the first floor the studios and galleries are laid out along a single long hall. The arrangement grows more warrenlike, and the sense of discovery concomitantly more pleasant, as you ascend. Artists work in a variety of media, including painting, fibre, printmaking, ceramics, jewellery, stained glass and photography.

Don't anticipate anything game-changing or jaw-dropping here. Expect plenty of cats and cows in different media, as well as watercolours of beach houses, ersatz Abstract Expressionist paintings, stained glass made for the walls of large suburban houses, baubles and knick-knacks and thingummies galore. All of it is skilfully done; most of it is pleasant.

The photography is an exception: the Multiple Exposures Gallery is first-rate, displaying not merely beautiful pictures but inventive techniques as well. On a recent visit the gallery showcased landscapes, including an especially arresting wide-angle aerial shot of a field in Fujian after a storm. Crops glinted in the rising sun like rows of wet sapphires, the scalloped grey clouds echoing the terraced farming beneath.

The Torpedo Factory's biggest draw, however, particularly for visitors with children, is not on what is sold but in the demystifying access visitors have to artists. While the galleries function traditionally, the artists work and sell out of the same studio; their raw materials and works in progress, the artistry behind the art, are all on display. Many of them are happy and eager to talk; one was soliciting the help of passers-by to complete a work, she wished to know how to say and write a certain phrase in Hebrew vernacular, a quest that might take time to complete in a yachty southern suburb. A metal sculptor sat on a stool patiently working a piece of metal back and forth in his hands. The centre of his studio was filled with a huge hollow sphere made from hundreds of cylinders of perhaps anodised aluminium. It seemed we were witnessing the first step in a thousand-mile march.`,
        questions: [
          {
            id: "r-academic-q1",
            questionText: "Alexandria's Old Town was originally designed to be a walking-friendly area.",
            questionType: "true-false-notgiven",
            correctAnswer: "not given"
          },
          {
            id: "r-academic-q2",
            questionText: "The US Naval Torpedo station was used for different purposes during its history.",
            questionType: "true-false-notgiven",
            correctAnswer: "true"
          },
          {
            id: "r-academic-q3",
            questionText: "Children particularly enjoy seeing artists at work in their studios.",
            questionType: "true-false-notgiven",
            correctAnswer: "true"
          },
          {
            id: "r-academic-q4",
            questionText: "After World War II ended, the torpedo station returned to being used for _________.",
            questionType: "fill-in-blank",
            correctAnswer: "storage"
          },
          {
            id: "r-academic-q5",
            questionText: "The layout of the Torpedo Factory becomes more _________ as visitors climb to higher floors.",
            questionType: "fill-in-blank",
            correctAnswer: "warrenlike"
          },
          {
            id: "r-academic-q6",
            questionText: "Which statement best reflects the writer's opinion about most of the art in the Torpedo Factory?",
            questionType: "multiple-choice",
            options: [
              "A. It is technically accomplished but not particularly innovative.", 
              "B. It is mainly poorly executed but pleasant to look at.", 
              "C. It is mostly game-changing and jaw-dropping.", 
              "D. It is primarily aimed at wealthy suburban homeowners."
            ],
            correctAnswer: "A. It is technically accomplished but not particularly innovative."
          },
          {
            id: "r-academic-q7",
            questionText: "Which feature offers visitors a chance to see artists creating their work?",
            questionType: "multiple-choice",
            options: [
              "A. The Multiple Exposures Gallery", 
              "B. The artists' studios", 
              "C. The building layout"
            ],
            correctAnswer: "B. The artists' studios"
          },
          {
            id: "r-academic-q8",
            questionText: "Which feature was praised for displaying creative photographic methods?",
            questionType: "multiple-choice",
            options: [
              "A. The Multiple Exposures Gallery", 
              "B. The artists' studios", 
              "C. The building layout"
            ],
            correctAnswer: "A. The Multiple Exposures Gallery"
          },
          {
            id: "r-academic-q9",
            questionText: "What does the phrase 'a thousand-mile march' in the final paragraph most likely refer to?",
            questionType: "multiple-choice",
            options: [
              "A. The physical distance the metal sculptor travels to work", 
              "B. The long journey of artistic creation", 
              "C. The literal size of the aluminium sculpture", 
              "D. The history of the Torpedo Factory building"
            ],
            correctAnswer: "B. The long journey of artistic creation"
          },
          {
            id: "r-academic-q10",
            questionText: "What is the main purpose of this text?",
            questionType: "multiple-choice",
            options: [
              "A. To criticize the quality of art displayed in the Torpedo Factory", 
              "B. To describe the history and current function of the Torpedo Factory", 
              "C. To compare the Torpedo Factory with other galleries in Washington, DC", 
              "D. To explain how the Torpedo Factory has improved Alexandria's economy"
            ],
            correctAnswer: "B. To describe the history and current function of the Torpedo Factory"
          }
        ]
      }
    },
    {
      id: "reading-general-001",
      type: "reading",
      title: "Reading Test (General Training)",
      timeInMinutes: 15,
      content: {
        passage: `# Flower Power

Alexandria in Virginia, USA, and particularly its well-tended Old Town section, is the sort of upscale suburb that rings most major American cities. From the array of pubs, sushi-restaurant chains and pasta joints that line its streets, you would never guess that within 20 minutes you can find some of the best Korean, Vietnamese, Chinese, Pakistani or Bolivian food in America. Its 18th-century homes have been carefully maintained; now that the nasty, dirty business of living in them is done, they are at last free to house upscale boutiques selling ornate pepper-shakers, local wine, birthday cakes for dogs and other essentials.

The day after the armistice that ended the first world war in 1918, the United States Navy began building the US Naval Torpedo station on the waterfront across the Potomac and just downriver from the Naval Research Laboratory in south-west Washington, DC. After a brief period of production, it stored munitions between the wars. When the second world war broke out, it built torpedoes for submarines and aircraft; when that war ended, the building was again used for storage. In 1969, the local Alexandria government bought the site, which had grown to comprise 11 buildings, from the federal government.

Five years later, after all the debris was removed and walls erected, the main building was refitted to house artists' studios. A quarter-century, and several extensive renovations, later the artists are still there: over 160 of them sharing 82 studios, six galleries and two workshops. The Art League School and the Alexandria Archaeology Museum also share the space, bringing in thousands more aspirants and students. All of this makes the Torpedo Factory, as it is now called, a low-key, family-friendly and craft-centred alternative to the many worthy galleries across the river.

The building is three-storeys tall; on the first floor the studios and galleries are laid out along a single long hall. The arrangement grows more warrenlike, and the sense of discovery concomitantly more pleasant, as you ascend. Artists work in a variety of media, including painting, fibre, printmaking, ceramics, jewellery, stained glass and photography.

The Torpedo Factory's biggest draw, particularly for visitors with children, is not on what is sold but in the demystifying access visitors have to artists. While the galleries function traditionally, the artists work and sell out of the same studio; their raw materials and works in progress, the artistry behind the art, are all on display. Many of them are happy and eager to talk; one was soliciting the help of passers-by to complete a work, she wished to know how to say and write a certain phrase in Hebrew vernacular, a quest that might take time to complete in a yachty southern suburb.`,
        questions: [
          {
            id: "r-general-q1",
            questionText: "The old houses in Alexandria now contain _________ instead of residents.",
            questionType: "fill-in-blank",
            correctAnswer: "upscale boutiques"
          },
          {
            id: "r-general-q2",
            questionText: "Between the First and Second World Wars, the naval station was used to store _________.",
            questionType: "fill-in-blank",
            correctAnswer: "munitions"
          },
          {
            id: "r-general-q3",
            questionText: "The layout of the Torpedo Factory becomes more _________ on the upper floors.",
            questionType: "fill-in-blank",
            correctAnswer: "warrenlike"
          },
          {
            id: "r-general-q4",
            questionText: "At the Torpedo Factory, artists both create and _________ in the same space.",
            questionType: "fill-in-blank",
            correctAnswer: "sell"
          },
          {
            id: "r-general-q5",
            questionText: "Alexandria's Old Town is difficult to navigate on foot.",
            questionType: "true-false-notgiven",
            correctAnswer: "false"
          },
          {
            id: "r-general-q6",
            questionText: "The US Naval Torpedo station was purchased by the local government in 1969.",
            questionType: "true-false-notgiven",
            correctAnswer: "true"
          },
          {
            id: "r-general-q7",
            questionText: "Most artwork at the Torpedo Factory is considered revolutionary and groundbreaking.",
            questionType: "true-false-notgiven",
            correctAnswer: "false"
          },
          {
            id: "r-general-q8",
            questionText: "What happened to the Torpedo Factory building five years after it was purchased?",
            questionType: "multiple-choice",
            options: [
              "A. It was turned into shops and restaurants.", 
              "B. It was renovated to house artists' studios.", 
              "C. The Alexandria Archaeology Museum was established there.", 
              "D. Artists began to work in the building without permission."
            ],
            correctAnswer: "B. It was renovated to house artists' studios."
          },
          {
            id: "r-general-q9",
            questionText: "According to the writer, what makes the Torpedo Factory special for visitors?",
            questionType: "multiple-choice",
            options: [
              "A. The quality of the artwork displayed", 
              "B. The low prices of the artwork", 
              "C. The ability to interact with artists at work", 
              "D. The connection to military history"
            ],
            correctAnswer: "C. The ability to interact with artists at work"
          },
          {
            id: "r-general-q10",
            questionText: "In the last paragraph, what does the writer suggest about the artists?",
            questionType: "multiple-choice",
            options: [
              "A. They are not very welcoming to visitors.", 
              "B. They are willing to engage with the public.", 
              "C. They work primarily on commissioned pieces.", 
              "D. They prefer to work in isolation."
            ],
            correctAnswer: "B. They are willing to engage with the public."
          }
        ]
      }
    },
    {
      id: "writing-academic-001",
      type: "writing",
      title: "Writing Test (Academic)",
      timeInMinutes: 15,
      content: {
        tasks: [
          {
            id: "w-academic-task1",
            taskNumber: 1,
            prompt: "The bar chart below shows current trends in art investment in New Zealand by age range. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
            wordCount: 120,
            timeInMinutes: 8,
            resources: "/images/sample-chart.svg" // This would need to be replaced with an actual chart image
          }
        ]
      }
    },
    {
      id: "writing-general-001",
      type: "writing",
      title: "Writing Test (General Training)",
      timeInMinutes: 15,
      content: {
        tasks: [
          {
            id: "w-general-task1",
            taskNumber: 1,
            prompt: "You have just received an invitation to an art exhibition. You would like more details about the event before you decide to go.\nWrite a letter to the organizer asking for more details. In your letter:\n* thank them for the invitation\n* ask what kind of art will be on display and the size of each section\n* ask if any of the artists will be present\nWrite at least 150 words. Begin your letter as follows: Dear .....................,",
            wordCount: 150,
            timeInMinutes: 8
          }
        ]
      }
    },
    {
      id: "speaking-001",
      type: "speaking",
      title: "Speaking Test",
      timeInMinutes: 15,
      content: {
        parts: [
          {
            id: "sp-part1",
            partNumber: 1,
            introduction: "In this part, the examiner will ask you general questions about yourself and familiar topics such as your home, family, work, studies, and interests.",
            questions: [
              "Do you have any artistic hobbies, such as painting? (Why/Why not?)",
              "What kind of art lessons did you have at school?",
              "How useful do you think it is to study art at school? (Why/Why not?)"
            ],
            timeInMinutes: 3
          },
          {
            id: "sp-part2",
            partNumber: 2,
            introduction: "In this part, I'm going to give you a topic to talk about for 1-2 minutes. Before you talk, you'll have 2 minutes to think about what you're going to say. You can make notes if you wish.",
            questions: [
              "Describe an art piece which you like very much. You should say: what it is, when and where you first saw it, why you like it and also say if you would like to have the piece, or a copy, in your home."
            ],
            timeInMinutes: 4,
            preparationTimeInSeconds: 120
          },
          {
            id: "sp-part3",
            partNumber: 3,
            introduction: "Now, let's discuss some more general questions related to art.",
            questions: [
              "What kind of art is often associated with your country?",
              "How important is art in our lives today do you think? In what ways?",
              "Do you think people are generally sufficiently educated about art?"
            ],
            timeInMinutes: 5
          }
        ]
      }
    }
  ]
};
