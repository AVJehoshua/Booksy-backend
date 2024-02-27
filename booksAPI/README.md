# Fetch a book and add to db

This code will ask you for a book, ask which of the results you want and then ask for a price and a category




## Demo

```
What book do you want to search for? Andre Agassi

1. Open by Andre Agassi image:[object Object]
2. The Agassi Story by Dominic Cobello,Mike Agassi,Kate Shoup Welsh image:[object Object]
3. The Whirl by Andre Agassi image:[object Object]
4. Andre Agassi by Matt Christopher image:[object Object]
5. Agassi and Ecstasy by Paul Bauman image:[object Object]
6. Andre Agassi by Gary Stern image:undefined
7. Summary of Andre Agassi's Open by Milkyway Media image:[object Object]
8. Andre Agassi by Ron Knapp image:[object Object]
9. On the Court with ... Andre Agassi by Matt Christopher image:undefined
10. Andre Agassi by Jeff Savage image:[object Object]

Which book do you want to choose? 1

Price for book: 10.99
Category for book Autobiography

(Book object returned when added to db)
```


## Notes

- First step enter book title
- A database connection message will popup
- Books will be returned
- Next choose the book from the choices (Books with an object list next to image contain an image, if there is no image as shown on example 6 and 9 image will show as undefined)
- The book title is returned as confirmation
- Next you will be asked for a price and a category
- Finally if the book is added the book document is returned

## Categories
>[!CAUTION]
>Do not try to add custom categories 

- Young Adult
- Romance
- Action
- History
- Non-fiction
- Thriller
- LGBTQIA+
- Mystery
- Autobiography


## Warnings

> [!NOTE]
> Code is solely for seeding
> As a result, code has little to no error checking
> Run code as intended