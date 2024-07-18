import express from "express";
import cors from 'cors';
import { GrowthBook } from "@growthbook/growthbook";
import cookieParser from 'cookie-parser'
import growthbookMiddleware from "./middleware/middleware.js";
const port = 8002;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(cookieParser());

app.use(growthbookMiddleware)
app.get("/", async (req, res) => {
    const gb = req.growthbook;
    // Boolean on/off flag
    if (gb.isOn("my-feature")) {
        
    res.status(200).json({"message":"My feature is ON"})
    }
    else
    {
        console.log("my-feature2");
    res.status(200).json({"message":"My feature is OFF"});
    }    
})

app.get('/profile', async (req, res) => {
    const gb = req.growthbook;
    console.log(gb.isOn('profile-feature'))
    if(gb.isOn('profile-feature'))
    {
        res.status(200).json({"message":"this is admin profile"})
    }
    else
    {
        res.status(200).json({"message":"this is not admin profile"})
    }
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});

