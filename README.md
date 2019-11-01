# React Scroll Demo  

_The goal of this demo is to create a webpage that performs a network request when the user reaches the bottom of the page._   

## Components  

__ScrollComponent__  
A high-order component that keeps track of the current scroll position as a percentage of the page height.

## Features  

__Strict Typing with TypeScript__  
lorem ipsum sit dolor amet  

__State Managment via Redux & Sagas__  
lorem ipsum sit dolor amet  

__Testing components via Jest__  
lorem ipsum sit dolor amet  

## On Formatting JSON  
The content of this project is an article describing how to manipulate JSON-formatted payloads for different tasks. 

```
// Given a server response with a schema that looks like:  
[
    {
        "key": {
            "day": [int],
            "id": [uuid]
        },
        "value": [int] 
    }
]

```

__Formatting JSON for charts__  
For use in a chart, you could make use of an adapter that parses the JSON such that the data is grouped by day. 

```
[
    {
        day: 1,
        values: [
            {
                "id": a,
                "value": 7
            }, {
                "id": b,
                "value": 8
            }, {
                "id": c,
                "value": 9
            }
        ]
    },
    ...
]
```  

__Formatting JSON for a table layout__  
For a table layout, you could write an adapter that parses the JSON such that the data fits the layout of a table row

```
[
	{ day: 1, value: 7, id: a }
	{ day: 1, value: 8, id: b }
	{ day: 1, value: 9, id: c }
	{ day: 2, value: 17, id: a }
	...
]
```