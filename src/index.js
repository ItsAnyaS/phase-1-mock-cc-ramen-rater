let ramenDisplayDiv = document.querySelector('#ramen-menu')
let ramenDetail = document.querySelector('#ramen-detail')
let name1 = document.querySelector('.name')
let restaurant = document.querySelector('.restaurant')
let detailImg = document.querySelector('.detail-image')
let ratingDisplay = document.querySelector('#rating-display')
let commentDisplay = document.querySelector('#comment-display')
let newRamenForm = document.querySelector('#new-ramen')
let editRamenForm = document.querySelector('#edit-ramen')

const getRamen = async () => {
let req = await fetch('http://localhost:3000/ramens') 
let res = await req.json()
return res
}

const renederRamen = async (arr) => {
    let result = await arr
    result.forEach(element => {
   let ramenImg = document.createElement('img')
    ramenImg.setAttribute('src', element.image)
    ramenDisplayDiv.append(ramenImg)

    ramenImg.addEventListener('click', (e) => {
    name1.innerText = element.name
    restaurant.innerText = element.restaurant
    detailImg.setAttribute('src', element.image)
    ratingDisplay.innerText = element.rating
    commentDisplay.innerText = element.comment
    })
    });
}


newRamenForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    let newRamenArr = []
    let newRamenObj = {
      name: "Naruto Ramen",
      restaurant: "Naruto",
      image: "./assets/ramen/naruto.jpg",
      rating: 10,
      comment: "My absolute fave!"
    }
    let newRamenName = e.target.name.value
    newRamenObj.name = newRamenName
    let newRamenRest = e.target.restaurant.value
     newRamenObj.restaurant = newRamenRest
    let newRamenImg = e.target.image.value
    newRamenObj.image = newRamenImg
    let newRamenRating = e.target.rating.value
     newRamenObj.rating = newRamenRating
    let newRamenComment = e.target['new-comment'].value
    newRamenObj.comment = newRamenComment
    newRamenArr.push(newRamenObj)
    ramenImg = document.createElement('img')
    ramenImg.setAttribute('src', newRamenObj.image)

    renederRamen(newRamenArr)

    fetch('http://localhost:3000/ramens/', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            name: newRamenObj.name,
            restaurant: newRamenObj.restaurant,
            image: newRamenObj.image,
            rating: newRamenObj.rating,
            comment: newRamenObj.comment
        })
    })

})

renederRamen(getRamen())

const displayFirstRamen = async () => {
req = await fetch('http://localhost:3000/ramens/1') 
res = await req.json()
name1.innerText = res.name
restaurant.innerText = res.restaurant
detailImg.setAttribute('src', res.image)
ratingDisplay.innerText = res.rating
commentDisplay.innerText = res.comment
}

editRamenForm.addEventListener('submit', (e) => {
    e.preventDefault()
    ratingDisplay.innerText = e.target.rating.value
    commentDisplay.innerText = e.target['new-comment'].value
})

displayFirstRamen()