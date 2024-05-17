## Item Simulator API 명세서

-   캐릭터 관련 API

| 기능 | API URL | Method | request | response |
| --- | --- | --- | --- | --- |
| 캐릭터 생성 | /api/characters | POST | {     "name": "캐릭터이름"   } | {     "message": "새로운 캐릭터 '캐릭터이름'을/를 생성하셨습니다!"     "character\_id": 1   } |
| 캐릭터 삭제 | /api/characters/:character\_id | DELETE | {} | {     "message": "캐릭터 '캐릭터이름'이/가 정상적으로 삭제되었습니다!   } |
| 캐릭터 전체 조회 | /api/characters | GET | {} | {     "character": \[       {         "character\_id": 1,         "name": "캐릭터이름"       }     \]   } |
| 캐릭터 상세 조회 | /api/characters/:character\_id | GET | {} | {   "character": {       \_id: "6645ace0281949cc5274fb71",       "character\_id": 1,       "name": "캐릭터이름",       "health": 500,       "power": 100     }   } |

-   아이템 관련 API

| 기능 | API URL | Method | request | response |
| --- | --- | --- | --- | --- |
| 아이템 생성 | /api/items | POST | {     "item\_code": 4,     "item\_name": "파멸의 반지",     "item\_stat": { "health": 20, "power": 2 }   } | {     "message": "새로운 아이템 파멸의 반지 을/를 생성하셨습니다!",     "item\_code": 4   } |
| 아이템 수정 | /api/items/:item\_code | PATCH | {     "item\_name": "파멸의 반지",     "item\_stat": { "health": 10, "power": 2 }   } | {     "message": "아이템 '파멸의 반지123'이/가 수정되었습니다!",     "baseItem": "변경 전: 파멸의 반지123, { health: 100, power: 20 }",     "patchedItem": "변경 후: 파멸의 반지, { health: 10, power: 2 }"   } |
| 아이템 전체 조회 | /api/items | GET | {} | {     "item": \[       {         "item\_code": 4,         "item\_name": "파멸의 반지"       }     \]   } |
| 아이템 상세 조회 | /api/items /:item\_code | GET | {} | {     "item": {       "item\_stat": {         "health": 100,         "power": 20       },       "item\_code": 4,       "item\_name": "파멸의 반지123"     }   } |

-   아이템 탈/장착 구현 X