import express from "express";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            "id": 1,
            "title": "The Programmer's Excuse",
            "content": "Why do programmers prefer dark mode? Because light attracts bugs!"
        },
        {
            "id": 2,
            "title": "The Mathematician's Diet",
            "content": "Why did the mathematician refuse to eat cake? Because he was already divided by pi!"
        },
        {
            "id": 3,
            "title": "The Lazy Developer",
            "content": "A programmer's wife asks him to go to the store and says 'Get a gallon of milk, and if they have eggs, get a dozen.' He comes back with 12 gallons of milk. She asks why, and he says 'They had eggs!'"
        },
        {
            "id": 4,
            "title": "The Honest Job Interview",
            "content": "I told my wife she was drawing her eyebrows too high. She looked surprised."
        },
        {
            "id": 5,
            "title": "The Optimist's Fall",
            "content": "What did the optimist say after falling off a skyscraper? 'So far, so good!'"
        }
    ]

    res.send(jokes)
})

app.listen(PORT, () => {
    console.log(`Server connected to http://localhost:3000/`);
})