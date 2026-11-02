import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeHex } from './color.js'

test('HEX 색상은 #RRGGBB 대문자 형식으로 정리한다', () => {
  assert.equal(normalizeHex('#e8b9b0'), '#E8B9B0')
  assert.equal(normalizeHex('738d70'), '#738D70')
})

test('짧은 HEX는 여섯 자리로 펼치고 잘못된 값은 거절한다', () => {
  assert.equal(normalizeHex('#abc'), '#AABBCC')
  assert.equal(normalizeHex('#12zz34'), null)
  assert.equal(normalizeHex('#12345'), null)
})

