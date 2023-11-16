const express = require('express');
const { Client } = require('@notionhq/client')
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const PORT = 4000;
const HOST = "localhost";

// key = "secret_Smr9aH0Rr9V47b0STygWwVr9MWRD820u0CfJm8M9xAc"
// const client = new Client({ auth: process.env.NOTION_API_KEY })

const notion = new Client({ auth:'secret_Lw709owFAFcqVDhTipbIIwykr3LRNDd4waeHGOjp7H9' })

// const databaseId = 'f4a78409f773459baf14c573ab104b58';

const databaseId = 'f4a78409f773459baf14c573ab104b58';

app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    const {title, email, notes, url } = req.body;

    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                Title: {
                    title: [
                        {
                            text: {
                                content: title
                            }
                        }
                    ]
                },
                Email: {
                    rich_text: [
                        {
                            text: {
                                content: email
                            }
                        }
                    ]
                },
                Notes: {
                    rich_text: [
                        {
                            text: {
                                content: notes
                            }
                        }
                    ]
                },
                // URL: {
                //     url: [
                //         {
                //             text: {
                //                 content: url
                //             }
                //         }
                //     ]
                // }
            }
        });

        console.log("URL: " + url)
        console.log(response);
        console.log("Success!!!");
        res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});