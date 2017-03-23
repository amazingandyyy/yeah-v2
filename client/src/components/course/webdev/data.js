import moment from 'moment';

export default {
    "_id" : "webdev",
    "course" : {
        "title" : "Introduction to Software Development",
        "overview" : "Our life cannot be separated from websites and applications. It's without any doubt that software development skills are essential for everyone, whether you are a business person or a potential software engineer. This class will be administrated by Andy, an amazing software developer who has swept 9 Hackathons across the US in a mere 2 years. The course starts from scratch and covers just about everything that you need to become a successful developer, from mindset to technical skills. In a span of a month, this course will translate your simple ideas into a feasible and scalable application. By the end of the course, you will have the ability to build up a website and share with your friends and families. More importantly, you will learn and earn the confidence to build up innovative products and change the world.",
        "startingDate" : "2017-04-08",
        "hoursPerWeek" : 5,
        "totalWeeks" : 6,
        "location" : {
            "location" : {
                "lng" : -122.2537809,
                "lat" : 37.871558
            },
            "gmaps" : {
                "types" : [ 
                    "establishment", 
                    "point_of_interest"
                ],
                "place_id" : "ChIJcQMtojp8hYARg3TZouAOzFE",
                "geometry" : {
                    "viewport" : {
                        "east" : -122.252431919708,
                        "north" : 37.8729069802915,
                        "west" : -122.255129880292,
                        "south" : 37.8702090197085
                    },
                    "location_type" : "APPROXIMATE",
                    "location" : {
                        "lng" : -122.2537809,
                        "lat" : 37.871558
                    }
                },
                "formatted_address" : "2220 Piedmont Ave, Berkeley, CA 94720, USA",
                "address_components" : [ 
                    {
                        "types" : [ 
                            "street_number"
                        ],
                        "short_name" : "2220",
                        "long_name" : "2220"
                    }, 
                    {
                        "types" : [ 
                            "route"
                        ],
                        "short_name" : "Piedmont Ave",
                        "long_name" : "Piedmont Avenue"
                    }, 
                    {
                        "types" : [ 
                            "locality", 
                            "political"
                        ],
                        "short_name" : "Berkeley",
                        "long_name" : "Berkeley"
                    }, 
                    {
                        "types" : [ 
                            "administrative_area_level_2", 
                            "political"
                        ],
                        "short_name" : "Alameda County",
                        "long_name" : "Alameda County"
                    }, 
                    {
                        "types" : [ 
                            "administrative_area_level_1", 
                            "political"
                        ],
                        "short_name" : "CA",
                        "long_name" : "California"
                    }, 
                    {
                        "types" : [ 
                            "country", 
                            "political"
                        ],
                        "short_name" : "US",
                        "long_name" : "United States"
                    }, 
                    {
                        "types" : [ 
                            "postal_code"
                        ],
                        "short_name" : "94720",
                        "long_name" : "94720"
                    }
                ]
            },
            "isFixture" : false,
            "placeId" : "ChIJcQMtojp8hYARg3TZouAOzFE",
            "label" : "Haas School of Business, Piedmont Avenue, Berkeley, CA, United States"
        },
        "textbook" : "A macbook or any laptop that can connected to the internet.",
        "syllabus" : false,
        "preRequirement" : "TBA",
        "_id" : "58b0e6fd74e18ef81a8cb12f",
        "takeaways" : [ 
            "Understand how brower works.", 
            "Know how to write codes that computer can understand and make things work", 
            "Have confidence to signup and go to a Hackathon.", 
            "Have no hesitate to jump in and make a dinning-time idea to be real and funstional website.", 
            "Have the ability to Google for resoruce and make yourself advance afterall.", 
            "Have the ability to build your own portfolio and make money from buidding website for others."
        ],
        "heighlights" : [ 
            {
                "title" : "Introduction & Browser & HTML structure",
                "description" : "You will learn topic about why do we learn HTML/CSS/JS, Web structure and Browser and learn the most basic concept of building a website.",
                "projects": ["Manipulate Facebook/DVC website", "Build a Hello Me website"],
                "_id" : "58b0e6fd74e18ef81a8cb133"
            }, 
            {
                "title" : "RWD and Styling for Web content, Git/Github",
                "description" : "You will learn how to make beautiful and colorful webtie with CSS. \nI will teach you the basics of color, font, size and position, margin, Padding, box and button. Moreover, you will learn how to make dynamics styles.",
                "projects": ["Restyle Facebook/DVC website", "Style the hello me website"],
                "_id" : "58b0e6fd74e18ef81a8cb132"
            },
            {
                "title" : "Bootstrap and jQuery",
                "description" : "You will learn how to use other people's CSS framework and learn to use the most-widely-used CSS framework called Bootstrap. Then I will teach you write your first Javascript language with Javascript Framwork called jQuery to make your website alive and palyable.",
                "projects": ["Apply RWD to the Hello Me website", "Use jQuery to make Hello Me website more fun"],
                "_id" : "58b0e6fd74e18ef81a8cb131"
            }, 
            {
                "title" : "Play with Object and json file, HTTP request",
                "description" : "Learn the concept of more than String in Javascript. We will learn Array and Object and JSON file. And learn how to access to web content via HTTP request.",
                "projects": ["Build a Resume with json file", "Build a weather App with HTTP request"],
                "_id" : "58b0e6fd74e18ef81a8cb130"
            }, 
            {
                "title" : "Git/Github and Deployment",
                "description" : "Make your website visiable by other people and learn to share your story and works. Learn to build more website as you go and learn what is confidence to your next step.",
                "projects": ["Build second HTTP web app"],
                "_id" : "58b0e6fd74e18ef81a8cb130"
            }, 
            {
                "title" : "Final Project Day",
                "description" : "4 hrs of building and 1:1 interview 1 hr of demo and 30 mins honor certifications",
                "projects": ["Build third HTTP web app"],
                "_id" : "58b0e6fd74e18ef81a8cb130"
            }
        ],
        "tags" : [ 
            "Computer Science"
        ]
    },
    "instructors" : [{
        "email" : "amazingandyyy@gmail.com",
        "firstName" : "Andy",
        "lastName" : "Chen",
        "phone" : "4084313552",
        "bio": `Andy自學平面設計、互動設計、專精程式開發多年，闖遍舊金山灣駭客松、
                開發者大會及創業聚會，他深信編程只是工具，是他完成夢想的一方法，
                追求專業的編程外，他更不斷思考品牌、產品、使用者體驗、商業模式等等
                全方位的價值。

                「把自己逼到牆角，墊起腳尖才能看更高」，對自己的要求近乎苛求的Andy
                常常說，這世界上沒有比「從想法到產品，從產品到讓使用者愛上」更動人的
                事了。打造優雅、極致、專業的產品是Andy一路一來的初心。
                編程占他生活的60%，一天沒編程，遍全身不舒服，編程起來往往六親不認、
                廢寢忘食，但他卻依然忘我並無斷追求，挑戰自己。`,
        "linkedinURL" : "https://www.linkedin.com/in/amazingandyyy",
        "_id" : "58b0e6fd74e18ef81a8cb12e",
        "currentPosition" : {
            "affiliation" : "UC Berkeley",
            "position" : "Cognitive Science"
        },
        "previousPosition" : {
            "affiliation" : "Multiple Open Source projects",
            "position" : "Contributor"
        },
        "imageURL" : "https://avatars0.githubusercontent.com/u/7886068?v=3&u=251be4bf60175498417a32e56c3c6979d2f9bd08&s=4004"
    }],
    "createBy" : "589284339973ecbedd83a033",
    "createAt" : 1487985735209.0,
    "__v" : 0
}