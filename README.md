## Item Simulator API 명세서

-   캐릭터 관련 API

| 기능 | API URL | Method | request | response |
| --- | --- | --- | --- | --- |
| 캐릭터 생성 | /api/characters | POST | {   "name": "캐릭터이름"   } | {     "message": "새로운 캐릭터 '캐릭터이름'을/를 생성하셨습니다!"     "character\_id": 1   } |
| 캐릭터 삭제 | /api/characters/:character\_id | DELETE | {} | {     "message": "캐릭터 '캐릭터이름'이/가 정상적으로 삭제되었습니다!   } |
| 캐릭터 전체 조회 | /api/characters | GET | {} | {     "character": \[       {         "character\_id": 1,         "name": "캐릭터이름"       }     \]   } |
| 캐릭터 상세 조회 | /api/characters/:character\_id | GET | {} | {   "character": {       \_id: "6645ace0281949cc5274fb71",       "character\_id": 1,       "name": "캐릭터이름",       "health": 500,       "power": 100     }   } |

-   아이템 관련 API

작성중..!