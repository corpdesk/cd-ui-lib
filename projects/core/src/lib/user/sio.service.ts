import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class SioService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() { }

  socket = io('http://localhost:3200');

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public pushData(data: any, eventName:string) {
    this.socket.emit(eventName, data);
  }

  public testMessage() {
    this.socket.emit('send-menu', this.getMsg());
  }

  public sioListen = () => {
    // this.socket.on('message', (message) =>{
    //   this.message$.next(message);
    // });
    this.socket.on('push-menu', (data) => {
      console.log('message:', data)
      console.log('JSON.stringify(message):', JSON.stringify(data))
      this.message$.next(data);
    });
    return this.message$.asObservable();
  };

  getMsg() {
    return {
      "pushData": {
        "appId": "",
        "pushGuid": "bcc18b79-9f35-4b3a-a0d4-c2a66339773e",
        "m": [
          {
            "label": "cd_geo",
            "id": 469,
            "icon": "ri-map-pin-line",
            "link": null,
            "isTitle": null,
            "badge": null,
            "parentId": -1,
            "isLayout": null,
            "moduleIsPublic": 1,
            "moduleGuid": "C620F2D8-A0AE-0406-7DB7-7ECE806722AA",
            "subItems": [
              {
                "label": "location",
                "id": 470,
                "icon": null,
                "link": "/moduleman/module/list",
                "isTitle": null,
                "badge": null,
                "parentId": 469,
                "isLayout": null,
                "moduleIsPublic": 1,
                "moduleGuid": "C620F2D8-A0AE-0406-7DB7-7ECE806722AA",
                "subItems": []
              }
            ]
          },
          {
            "label": "Modman",
            "id": 995,
            "icon": "ri-user-settings-line",
            "link": "./admin",
            "isTitle": null,
            "badge": null,
            "parentId": -1,
            "isLayout": null,
            "moduleIsPublic": null,
            "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
            "subItems": [
              {
                "label": "dashboard",
                "id": 996,
                "icon": null,
                "link": "admin/admin-dashboard",
                "isTitle": null,
                "badge": null,
                "parentId": 995,
                "isLayout": null,
                "moduleIsPublic": null,
                "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                "subItems": []
              },
              {
                "label": "cdobj",
                "id": 997,
                "icon": null,
                "link": "/moduleman/cd-obj/list",
                "isTitle": null,
                "badge": null,
                "parentId": 995,
                "isLayout": null,
                "moduleIsPublic": null,
                "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                "subItems": []
              },
              {
                "label": "company",
                "id": 998,
                "icon": null,
                "link": "/moduleman/company/list",
                "isTitle": null,
                "badge": null,
                "parentId": 995,
                "isLayout": null,
                "moduleIsPublic": null,
                "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                "subItems": []
              },
              {
                "label": "grus",
                "id": 999,
                "icon": null,
                "link": "admin/grus",
                "isTitle": null,
                "badge": null,
                "parentId": 995,
                "isLayout": null,
                "moduleIsPublic": null,
                "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                "subItems": []
              },
              {
                "label": "menu",
                "id": 1000,
                "icon": null,
                "link": "/moduleman/menu/list",
                "isTitle": null,
                "badge": null,
                "parentId": 995,
                "isLayout": null,
                "moduleIsPublic": null,
                "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                "subItems": []
              },
              {
                "label": "module",
                "id": 1001,
                "icon": null,
                "link": "/moduleman/module/list",
                "isTitle": null,
                "badge": null,
                "parentId": 995,
                "isLayout": null,
                "moduleIsPublic": null,
                "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                "subItems": []
              },
              {
                "label": "consumer",
                "id": 1269,
                "icon": null,
                "link": "/moduleman/consumer/list",
                "isTitle": null,
                "badge": null,
                "parentId": 995,
                "isLayout": null,
                "moduleIsPublic": null,
                "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                "subItems": []
              },
              {
                "label": "consumer-resource",
                "id": 1271,
                "icon": null,
                "link": null,
                "isTitle": null,
                "badge": null,
                "parentId": 995,
                "isLayout": null,
                "moduleIsPublic": null,
                "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                "subItems": []
              }
            ]
          },
          {
            "label": "MyDesk",
            "id": 1,
            "icon": "ri-user-line",
            "link": null,
            "isTitle": null,
            "badge": null,
            "parentId": -1,
            "isLayout": null,
            "moduleIsPublic": 0,
            "moduleGuid": "-dkkm6",
            "subItems": [
              {
                "label": "Users",
                "id": 2,
                "icon": null,
                "link": "",
                "isTitle": null,
                "badge": null,
                "parentId": 1,
                "isLayout": null,
                "moduleIsPublic": 0,
                "moduleGuid": "-dkkm6",
                "subItems": []
              },
              {
                "label": "Comm",
                "id": 3,
                "icon": null,
                "link": "",
                "isTitle": null,
                "badge": null,
                "parentId": 1,
                "isLayout": null,
                "moduleIsPublic": 0,
                "moduleGuid": "-dkkm6",
                "subItems": [
                  {
                    "label": "Emails",
                    "id": 16,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 3,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "memo",
                    "id": 221,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 3,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  }
                ]
              },
              {
                "label": "Settings",
                "id": 6,
                "icon": null,
                "link": null,
                "isTitle": null,
                "badge": null,
                "parentId": 1,
                "isLayout": null,
                "moduleIsPublic": 0,
                "moduleGuid": "-dkkm6",
                "subItems": [
                  {
                    "label": "notifications",
                    "id": 4,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 6,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "logs",
                    "id": 5,
                    "icon": null,
                    "link": "",
                    "isTitle": null,
                    "badge": null,
                    "parentId": 6,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  }
                ]
              },
              {
                "label": "Moduleman",
                "id": 7,
                "icon": null,
                "link": "/moduleman/module/list",
                "isTitle": null,
                "badge": null,
                "parentId": 1,
                "isLayout": null,
                "moduleIsPublic": 0,
                "moduleGuid": "-dkkm6",
                "subItems": []
              },
              {
                "label": "SyncGuig",
                "id": 8,
                "icon": null,
                "link": "/moduleman/menu/list",
                "isTitle": null,
                "badge": null,
                "parentId": 1,
                "isLayout": null,
                "moduleIsPublic": 0,
                "moduleGuid": "-dkkm6",
                "subItems": []
              },
              {
                "label": "CD-Scheduler",
                "id": 9,
                "icon": null,
                "link": null,
                "isTitle": null,
                "badge": null,
                "parentId": 1,
                "isLayout": null,
                "moduleIsPublic": 0,
                "moduleGuid": "-dkkm6",
                "subItems": [
                  {
                    "label": "Subscribe",
                    "id": 10,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 9,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "MyCalendar",
                    "id": 11,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 9,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "MyProgress",
                    "id": 12,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 9,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "SchedulerBlogs",
                    "id": 13,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 9,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "Admin",
                    "id": 14,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 9,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  }
                ]
              },
              {
                "label": "Users&Groups",
                "id": 17,
                "icon": null,
                "link": null,
                "isTitle": null,
                "badge": null,
                "parentId": 1,
                "isLayout": null,
                "moduleIsPublic": 0,
                "moduleGuid": "-dkkm6",
                "subItems": []
              },
              {
                "label": "controller_mgr",
                "id": 18,
                "icon": null,
                "link": null,
                "isTitle": null,
                "badge": null,
                "parentId": 1,
                "isLayout": null,
                "moduleIsPublic": 0,
                "moduleGuid": "-dkkm6",
                "subItems": []
              },
              {
                "label": "Generic",
                "id": 19,
                "icon": null,
                "link": null,
                "isTitle": null,
                "badge": null,
                "parentId": 1,
                "isLayout": null,
                "moduleIsPublic": 0,
                "moduleGuid": "-dkkm6",
                "subItems": [
                  {
                    "label": "Generic Form",
                    "id": 20,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 19,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "Generic Foo Table",
                    "id": 21,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 19,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "Generic Tree",
                    "id": 22,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 19,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "ProgressBar",
                    "id": 23,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 19,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "controller-view",
                    "id": 217,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 19,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "controller-view2",
                    "id": 218,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 19,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  },
                  {
                    "label": "cd-memo",
                    "id": 220,
                    "icon": null,
                    "link": null,
                    "isTitle": null,
                    "badge": null,
                    "parentId": 19,
                    "isLayout": null,
                    "moduleIsPublic": 0,
                    "moduleGuid": "-dkkm6",
                    "subItems": []
                  }
                ]
              }
            ]
          }
        ],
        "pushRecepients": [
          {
            "userId": 1010,
            "subTypeId": 7,
            "cdObjId": {
              "ngModule": "SharedModule",
              "resourceName": "SidebarComponent",
              "resourceGuid": "4947e79b-aa79-4960-a99d-775b24286e07",
              "jwtToken": "",
              "socket": null,
              "commTrack": {
                "initTime": 1654606466149,
                "relayTime": null,
                "relayed": false,
                "deliveryTime": null,
                "deliverd": false
              }
            }
          },
          {
            "userId": 1010,
            "subTypeId": 1,
            "cdObjId": {
              "ngModule": "UserModule",
              "resourceName": "SessService",
              "resourceGuid": "9ac6caf5-9eb5-4e6d-9555-2496a13eb86a",
              "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YWM2Y2FmNS05ZWI1LTRlNmQtOTU1NS0yNDk2YTEzZWI4NmEiLCJ1c2VybmFtZSI6IlNlc3NTZXJ2aWNlIiwiaWF0IjoxNjU0NDY1OTc2LCJleHAiOjE2NTQ0NjY4NzZ9.nT1QqnjKx_MC4teXIVNrqXhU9FQYSUbEpEx8QhBhup0",
              "socket": null,
              "commTrack": {
                "initTime": 1654465976940,
                "relayTime": null,
                "relayed": false,
                "deliveryTime": null,
                "deliverd": false
              }
            }
          }
        ],
        "triggerEvent": "login",
        "emittEvent": "push-menu",
        "token": "78f8c78c-a0cf-4686-b62a-4fcc1a3f3b31",
        "commTrack": {
          "initTime": null,
          "relayTime": null,
          "relayed": false,
          "deliveryTime": null,
          "deliverd": false
        }
      },
      "req": {
        "ctx": "Sys",
        "m": "User",
        "c": "User",
        "a": "Login",
        "dat": {
          "f_vals": [
            {
              "data": null
            }
          ],
          "token": "78f8c78c-a0cf-4686-b62a-4fcc1a3f3b31"
        },
        "args": null
      },
      "resp": {
        "app_state": {
          "success": true,
          "info": {
            "messages": [],
            "code": "",
            "app_msg": "Welcome karl!"
          },
          "sess": {
            "cd_token": "78f8c78c-a0cf-4686-b62a-4fcc1a3f3b31",
            "userId": 1010,
            "jwt": null,
            "ttl": 600,
            "initUuid": "78f9827a-d865-4950-add3-c29e1cc7c1f5",
            "initTime": "1654607143.532"
          },
          "cache": {},
          "sConfig": {
            "usePush": true,
            "usePolling": true,
            "useCacheStore": true
          }
        },
        "data": {
          "consumer": [
            {
              "consumerId": 33,
              "consumerGuid": "B0B3DA99-1859-A499-90F6-1E3F69575DCD",
              "consumerName": "emp_services",
              "consumerEnabled": 1,
              "docId": 9276,
              "companyId": 85,
              "companyGuid": "8a7ee96e-6c76-11ec-a1b0-4184d18c49ca"
            }
          ],
          "menuData": [
            {
              "menuLabel": "cd_geo",
              "menuId": 469,
              "icon": "ri-map-pin-line",
              "path": null,
              "isTitle": null,
              "badge": null,
              "menuParentId": -1,
              "isLayout": null,
              "moduleIsPublic": 1,
              "moduleGuid": "C620F2D8-A0AE-0406-7DB7-7ECE806722AA",
              "children": [
                {
                  "menuLabel": "location",
                  "menuId": 470,
                  "icon": null,
                  "path": "/moduleman/module/list",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 469,
                  "isLayout": null,
                  "moduleIsPublic": 1,
                  "moduleGuid": "C620F2D8-A0AE-0406-7DB7-7ECE806722AA",
                  "children": []
                }
              ]
            },
            {
              "menuLabel": "Modman",
              "menuId": 995,
              "icon": "ri-user-settings-line",
              "path": "./admin",
              "isTitle": null,
              "badge": null,
              "menuParentId": -1,
              "isLayout": null,
              "moduleIsPublic": null,
              "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
              "children": [
                {
                  "menuLabel": "dashboard",
                  "menuId": 996,
                  "icon": null,
                  "path": "admin/admin-dashboard",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 995,
                  "isLayout": null,
                  "moduleIsPublic": null,
                  "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                  "children": []
                },
                {
                  "menuLabel": "cdobj",
                  "menuId": 997,
                  "icon": null,
                  "path": "/moduleman/cd-obj/list",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 995,
                  "isLayout": null,
                  "moduleIsPublic": null,
                  "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                  "children": []
                },
                {
                  "menuLabel": "company",
                  "menuId": 998,
                  "icon": null,
                  "path": "/moduleman/company/list",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 995,
                  "isLayout": null,
                  "moduleIsPublic": null,
                  "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                  "children": []
                },
                {
                  "menuLabel": "grus",
                  "menuId": 999,
                  "icon": null,
                  "path": "admin/grus",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 995,
                  "isLayout": null,
                  "moduleIsPublic": null,
                  "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                  "children": []
                },
                {
                  "menuLabel": "menu",
                  "menuId": 1000,
                  "icon": null,
                  "path": "/moduleman/menu/list",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 995,
                  "isLayout": null,
                  "moduleIsPublic": null,
                  "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                  "children": []
                },
                {
                  "menuLabel": "module",
                  "menuId": 1001,
                  "icon": null,
                  "path": "/moduleman/module/list",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 995,
                  "isLayout": null,
                  "moduleIsPublic": null,
                  "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                  "children": []
                },
                {
                  "menuLabel": "consumer",
                  "menuId": 1269,
                  "icon": null,
                  "path": "/moduleman/consumer/list",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 995,
                  "isLayout": null,
                  "moduleIsPublic": null,
                  "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                  "children": []
                },
                {
                  "menuLabel": "consumer-resource",
                  "menuId": 1271,
                  "icon": null,
                  "path": null,
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 995,
                  "isLayout": null,
                  "moduleIsPublic": null,
                  "moduleGuid": "00e7c6a8-83e4-40e2-bd27-51fcff9ce63b",
                  "children": []
                }
              ]
            },
            {
              "menuLabel": "MyDesk",
              "menuId": 1,
              "icon": "ri-user-line",
              "path": null,
              "isTitle": null,
              "badge": null,
              "menuParentId": -1,
              "isLayout": null,
              "moduleIsPublic": 0,
              "moduleGuid": "-dkkm6",
              "children": [
                {
                  "menuLabel": "Users",
                  "menuId": 2,
                  "icon": null,
                  "path": "",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 1,
                  "isLayout": null,
                  "moduleIsPublic": 0,
                  "moduleGuid": "-dkkm6",
                  "children": []
                },
                {
                  "menuLabel": "Comm",
                  "menuId": 3,
                  "icon": null,
                  "path": "",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 1,
                  "isLayout": null,
                  "moduleIsPublic": 0,
                  "moduleGuid": "-dkkm6",
                  "children": [
                    {
                      "menuLabel": "Emails",
                      "menuId": 16,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 3,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "memo",
                      "menuId": 221,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 3,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    }
                  ]
                },
                {
                  "menuLabel": "Settings",
                  "menuId": 6,
                  "icon": null,
                  "path": null,
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 1,
                  "isLayout": null,
                  "moduleIsPublic": 0,
                  "moduleGuid": "-dkkm6",
                  "children": [
                    {
                      "menuLabel": "notifications",
                      "menuId": 4,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 6,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "logs",
                      "menuId": 5,
                      "icon": null,
                      "path": "",
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 6,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    }
                  ]
                },
                {
                  "menuLabel": "Moduleman",
                  "menuId": 7,
                  "icon": null,
                  "path": "/moduleman/module/list",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 1,
                  "isLayout": null,
                  "moduleIsPublic": 0,
                  "moduleGuid": "-dkkm6",
                  "children": []
                },
                {
                  "menuLabel": "SyncGuig",
                  "menuId": 8,
                  "icon": null,
                  "path": "/moduleman/menu/list",
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 1,
                  "isLayout": null,
                  "moduleIsPublic": 0,
                  "moduleGuid": "-dkkm6",
                  "children": []
                },
                {
                  "menuLabel": "CD-Scheduler",
                  "menuId": 9,
                  "icon": null,
                  "path": null,
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 1,
                  "isLayout": null,
                  "moduleIsPublic": 0,
                  "moduleGuid": "-dkkm6",
                  "children": [
                    {
                      "menuLabel": "Subscribe",
                      "menuId": 10,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 9,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "MyCalendar",
                      "menuId": 11,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 9,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "MyProgress",
                      "menuId": 12,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 9,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "SchedulerBlogs",
                      "menuId": 13,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 9,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "Admin",
                      "menuId": 14,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 9,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    }
                  ]
                },
                {
                  "menuLabel": "Users&Groups",
                  "menuId": 17,
                  "icon": null,
                  "path": null,
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 1,
                  "isLayout": null,
                  "moduleIsPublic": 0,
                  "moduleGuid": "-dkkm6",
                  "children": []
                },
                {
                  "menuLabel": "controller_mgr",
                  "menuId": 18,
                  "icon": null,
                  "path": null,
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 1,
                  "isLayout": null,
                  "moduleIsPublic": 0,
                  "moduleGuid": "-dkkm6",
                  "children": []
                },
                {
                  "menuLabel": "Generic",
                  "menuId": 19,
                  "icon": null,
                  "path": null,
                  "isTitle": null,
                  "badge": null,
                  "menuParentId": 1,
                  "isLayout": null,
                  "moduleIsPublic": 0,
                  "moduleGuid": "-dkkm6",
                  "children": [
                    {
                      "menuLabel": "Generic Form",
                      "menuId": 20,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 19,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "Generic Foo Table",
                      "menuId": 21,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 19,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "Generic Tree",
                      "menuId": 22,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 19,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "ProgressBar",
                      "menuId": 23,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 19,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "controller-view",
                      "menuId": 217,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 19,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "controller-view2",
                      "menuId": 218,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 19,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    },
                    {
                      "menuLabel": "cd-memo",
                      "menuId": 220,
                      "icon": null,
                      "path": null,
                      "isTitle": null,
                      "badge": null,
                      "menuParentId": 19,
                      "isLayout": null,
                      "moduleIsPublic": 0,
                      "moduleGuid": "-dkkm6",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ],
          "userData": {
            "userId": 1010,
            "userGuid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
            "userName": "karl",
            "email": "karl.lulu@anon.com",
            "companyId": 85,
            "docId": 34,
            "mobile": "895909",
            "gender": 1,
            "birthDate": "1976-03-10T06:53:37.000Z",
            "postalAddr": "85849",
            "fName": "Karl",
            "mName": "D",
            "lName": "Lulu",
            "nationalId": "85909",
            "passportId": "89599",
            "userEnabled": true,
            "zipCode": null,
            "activationKey": "8968959",
            "userTypeId": 1
          }
        }
      }
    }
  }
}