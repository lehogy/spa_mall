const express = require('express')
const router = express.Router()
const Cart = require('../schemas/cart.js')
const Goods = require('../schemas/goods.js')

// 장바구니 조회 api
router.get('/carts', async (req, res) => {
  const carts = await Cart.find({}) // Cart 스키마를 모두 가져온다.
  // console.log(carts) // [{_id: 값, goodsId: 값, quantity: 값, __v: 값}, {_id: 값, goodsId: 값, quantity: 값, __v: 값}, ...]
  const goodIds = carts.map((cart) => {
    return cart.goodsId // → 위에서 가져온 Cart스키마에서 goodsId만 추출한다. → [goodsId, goodsId] ex)[2, 14, 50, ...]
  })
  // console.log(goodIds) // 확인해보자  
  const goods = await Goods.find({goodsId: goodIds}) // → carts에서 뽑아낸 goodsIds랑 일치하는 상품 정보를 끌어낸다. [ {모든 상품정보}, {모든 상품정보}, ...]
  // console.log(goods)

  const results = carts.map((cart) => {
    return {
      'quantity': cart.quantity,
      'goods': goods.find((item) => item.goodsId === cart.goodsId)
    }
  })
  res.json({
    'carts': results
  })
})

module.exports =  router;