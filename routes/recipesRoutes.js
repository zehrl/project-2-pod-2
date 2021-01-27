// Requiring our models and passport as we've configured it
const db = require("../models");
const router = require("express").Router();

// get one recipe from ID
router.get("/api/recipes/:id", (req, res) => {
    db.Recipes.findAll({
        where: {
            id: req.params.id
        }
    }).then((data, err) => {``
        console.log(req.body)
        if (err) throw err
        res.json(data);
    })
})

// get 10 recipes

// create recipe route
router.post("/api/recipes", (req, res) => {
    db.Recipes.create({
        name: req.body.name,
        ingredient: req.body.ingredient,
        instruction: req.body.instruction,
        UserId: req.body.userId
    }).then((data, err) => {``
        console.log(req.body)
        if (err) throw err
        res.json(data);
    })
})

// delete recipe route
router.delete("/api/recipes/:id", (req, res) => {
    db.Recipes.destroy({
        where: {
            id: req.params.id
        }
    }).then((data, err) => {
        if (err) throw err
        res.json(data);
    })
})

// update recipe route


module.exports = router;