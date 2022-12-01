const express = require('express');
const routes = express.Router();
const restaurants = require('../data');

let currentRestaurantId = 2;
routes.get('/',(req,res)=>{
    res.json(restaurants);
});
routes.get('/:id',(req, res)=>{
    const restaurantId =Number.parseInt(req.params.id, 10);
    const restaurant = restaurants.find((restaurant)=>restaurant.id === restaurantId);
    res.json(restaurant);
});
routes.post('/',(req,res)=>{
    currentRestaurantId += 1;
    const newRestaurant = {
        id: currentRestaurantId,
        ...req.body
    };
    restaurants.push(newRestaurant);
    res.json(newRestaurant);

});

routes.put('/:id',(req,res)=>{
    const  restaurantId = Number.parseInt(req.params.id, 10);
    const restaurantIndex = restaurants.findIndex(
        (restaurant)=>restaurant.id === restaurantId
    );
    const updateRestaurant ={
        id: restaurantId,
        ...req.body
    }
    restaurants[restaurantIndex] = updateRestaurant;
    res.json(updateRestaurant);
});
routes.delete("/:id",(req,res)=>{
    const  restaurantId = Number.parseInt(req.params.id, 10);
    const  restaurantIndex = restaurants.findIndex(
        (restaurant)=>restaurant.id == restaurantId
    );
    restaurants.slice(restaurantIndex, 1);
    res.send("This is delete finish!!!!");
    res.sendStatus(204);
});

module.exports =routes;

