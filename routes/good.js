// routes/good.js
const express = require('express')
const router = express.Router()

const goods = [
  {
    goodsId: 4,
    name: "상품 4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    category: "drink",
    price: 0.1,
  },
  {
    goodsId: 3,
    name: "상품 3",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    category: "drink",
    price: 2.2,
  },
  {
    goodsId: 2,
    name: "상품 2",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    category: "drink",
    price: 0.11,
  },
  {
    goodsId: 1,
    name: "상품 1",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    category: "drink",
    price: 6.2,
  },
];
// 상품 전체 조회
router.get('/goods', (req, res) => {
  res.status(200).json({goods})
})

// 상품 개별 조회
router.get('/goods/:goodsId', (req, res) => {
  const {goodsId} = req.params 
  // goodsId의 출력이 string형태로 나오기 때문에 밑에서 Number를 사용했다.
  // let result = null
  // for (const good of goods) {
  //   if (Number(goodsId) === good.goodsId) {
  //     result = good
  //   }
  // } 

  const [result] = goods.filter((good) => Number(goodsId) === good.goodsId) // 위의 주석된 코드는 filter로 한줄로 표현할 수 있다.
  
  res.status(200).json({'detail': result})
})

// 장바구니 추가 api
const Cart = require('../schemas/cart.js')
router.post('/goods/:goodsId/cart', async (req, res) => {
  const {goodsId} = req.params
  const {quantity} = req.body

  const existsCarts = await Cart.find({goodsId})
  if (existsCarts.length) {
    return res.status(400).json({success: false, errorMessage: '이미 장바구니에 해당하는 상품이 존재합니다.'})
  }

  await Cart.create({goodsId, quantity})
  res.json({result: 'success'})
})
// 장바구니 수량 수정 api
router.put('/goods/:goodsId/cart', async (req, res) => {
  const {goodsId} = req.params
  const {quantity} = req.body

  const existsCarts = await Cart.find({goodsId})
  if (existsCarts.length) {
    await Cart.updateOne({goodsId: goodsId}, {$set: {quantity: quantity}})
  }
  res.status(200).json({success: true})
})

// 장바구니 제거 api
router.delete('/goods/:goodsId/cart', async (req, res) => {
  const {goodsId} = req.params
  const existsCarts = await Cart.find({goodsId})
  if (existsCarts.length) {
    await Cart.deleteOne({goodsId})
  }
  res.json({result: 'success'})
})

// 상품 등록 api
const Goods = require('../schemas/goods.js')
router.post('/goods', async (req, res) => {
  const {goodsId, name, thumbnailUrl, category, price} = req.body

  const goods = await Goods.find({goodsId}) // 1. await은 동기적으로 처리하기 위해서 있는 것. 2. goodsId 중복을 방지하기 위해서 검증해야한다.
  if (goods.length) {
    return res.status(400).json({success: false, errorMessage: '이미 존재하는 GoodsId입니다.'})
  }

  const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price})

  res.json({goods: createdGoods})
})

module.exports = router; // router 변수를 밖으로 내보내준다.