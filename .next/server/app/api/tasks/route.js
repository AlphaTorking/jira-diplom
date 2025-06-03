/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/tasks/route";
exports.ids = ["app/api/tasks/route"];
exports.modules = {

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftasks%2Froute&page=%2Fapi%2Ftasks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftasks%2Froute.ts&appDir=F%3A%5CJS%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%5CShitpost%5Cjira-diplom%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5CJS%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%5CShitpost%5Cjira-diplom%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftasks%2Froute&page=%2Fapi%2Ftasks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftasks%2Froute.ts&appDir=F%3A%5CJS%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%5CShitpost%5Cjira-diplom%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5CJS%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%5CShitpost%5Cjira-diplom%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var F_JS_Shitpost_jira_diplom_src_app_api_tasks_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/tasks/route.ts */ \"(rsc)/./src/app/api/tasks/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/tasks/route\",\n        pathname: \"/api/tasks\",\n        filename: \"route\",\n        bundlePath: \"app/api/tasks/route\"\n    },\n    resolvedPagePath: \"F:\\\\JS Обучение\\\\Shitpost\\\\jira-diplom — копия\\\\src\\\\app\\\\api\\\\tasks\\\\route.ts\",\n    nextConfigOutput,\n    userland: F_JS_Shitpost_jira_diplom_src_app_api_tasks_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ0YXNrcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdGFza3MlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ0YXNrcyUyRnJvdXRlLnRzJmFwcERpcj1GJTNBJTVDSlMlMjAlRDAlOUUlRDAlQjElRDElODMlRDElODclRDAlQjUlRDAlQkQlRDAlQjglRDAlQjUlNUNTaGl0cG9zdCU1Q2ppcmEtZGlwbG9tJTIwJUUyJTgwJTk0JTIwJUQwJUJBJUQwJUJFJUQwJUJGJUQwJUI4JUQxJThGJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1GJTNBJTVDSlMlMjAlRDAlOUUlRDAlQjElRDElODMlRDElODclRDAlQjUlRDAlQkQlRDAlQjglRDAlQjUlNUNTaGl0cG9zdCU1Q2ppcmEtZGlwbG9tJTIwJUUyJTgwJTk0JTIwJUQwJUJBJUQwJUJFJUQwJUJGJUQwJUI4JUQxJThGJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM4QjtBQUMzRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRjpcXFxcSlMg0J7QsdGD0YfQtdC90LjQtVxcXFxTaGl0cG9zdFxcXFxqaXJhLWRpcGxvbSDigJQg0LrQvtC/0LjRj1xcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFx0YXNrc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdGFza3Mvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS90YXNrc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdGFza3Mvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJGOlxcXFxKUyDQntCx0YPRh9C10L3QuNC1XFxcXFNoaXRwb3N0XFxcXGppcmEtZGlwbG9tIOKAlCDQutC+0L/QuNGPXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXHRhc2tzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftasks%2Froute&page=%2Fapi%2Ftasks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftasks%2Froute.ts&appDir=F%3A%5CJS%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%5CShitpost%5Cjira-diplom%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5CJS%20%D0%9E%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%5CShitpost%5Cjira-diplom%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/tasks/route.ts":
/*!************************************!*\
  !*** ./src/app/api/tasks/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prismaClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prismaClient */ \"(rsc)/./src/lib/prismaClient.ts\");\n/* harmony import */ var _lib_authUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/authUtils */ \"(rsc)/./src/lib/authUtils.ts\");\n\n\n\nasync function GET(req) {\n    try {\n        const userId = await (0,_lib_authUtils__WEBPACK_IMPORTED_MODULE_2__.getCurrentUser)(req);\n        const body = await req.json();\n        console.log('Request Body:', body); // Добавим лог для отладки\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Не авторизован'\n            }, {\n                status: 401\n            });\n        }\n        if (!body.name) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Название задачи обязательно'\n            }, {\n                status: 400\n            });\n        }\n        // Получаем пространство пользователя\n        const user = await _lib_prismaClient__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                spaceId: true\n            }\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Пользователь не найден'\n            }, {\n                status: 404\n            });\n        }\n        const tasks = await _lib_prismaClient__WEBPACK_IMPORTED_MODULE_1__[\"default\"].task.findMany({\n            where: {\n                spaceId: user.spaceId // Фильтруем по пространству\n            },\n            include: {\n                author: true,\n                worker: true,\n                group: true,\n                space: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            tasks\n        });\n    } catch (error) {\n        console.error('Error fetching tasks:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Ошибка загрузки задач'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(req) {\n    try {\n        const userId = await (0,_lib_authUtils__WEBPACK_IMPORTED_MODULE_2__.getCurrentUser)(req);\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Не авторизован'\n            }, {\n                status: 401\n            });\n        }\n        // Получаем данные пользователя\n        const user = await _lib_prismaClient__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findUnique({\n            where: {\n                id: userId\n            },\n            select: {\n                spaceId: true,\n                companyId: true\n            }\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Пользователь не найден'\n            }, {\n                status: 404\n            });\n        }\n        const body = await req.json();\n        // Валидация данных\n        if (!body.name || !body.groupId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Не заполнены обязательные поля'\n            }, {\n                status: 400\n            });\n        }\n        const newTask = await _lib_prismaClient__WEBPACK_IMPORTED_MODULE_1__[\"default\"].task.create({\n            data: {\n                name: body.name,\n                description: body.description,\n                criticality: body.criticality,\n                priority: body.priority,\n                status: body.status,\n                authorId: userId,\n                groupId: Number(body.groupId),\n                spaceId: user.spaceId,\n                createDate: new Date()\n            },\n            include: {\n                author: true,\n                group: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(newTask, {\n            status: 201\n        });\n    } catch (error) {\n        console.error('Task creation error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Ошибка создания задачи'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhNUIsS0FBSzRCLFdBQVc7Z0JBQzdCQyxVQUFVN0IsS0FBSzZCLFFBQVE7Z0JBQ3ZCeEIsUUFBUUwsS0FBS0ssTUFBTTtnQkFDbkJ5QixVQUFVL0I7Z0JBQ1Z3QixTQUFTUSxPQUFPL0IsS0FBS3VCLE9BQU87Z0JBQzVCWCxTQUFTTCxLQUFLSyxPQUFPO2dCQUNyQm9CLFlBQVksSUFBSUM7WUFDbEI7WUFDQWpCLFNBQVM7Z0JBQ1BDLFFBQVE7Z0JBQ1JFLE9BQU87WUFDVDtRQUNGO1FBRUEsT0FBT3pCLHFEQUFZQSxDQUFDTyxJQUFJLENBQUN1QixTQUFTO1lBQUVuQixRQUFRO1FBQUk7SUFDbEQsRUFBRSxPQUFPRCxPQUFPO1FBQ2RGLFFBQVFFLEtBQUssQ0FBQyx3QkFBd0JBO1FBQ3RDLE9BQU9WLHFEQUFZQSxDQUFDTyxJQUFJLENBQ3RCO1lBQUVHLE9BQU87UUFBeUIsR0FDbEM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkY6XFxKUyDQntCx0YPRh9C10L3QuNC1XFxTaGl0cG9zdFxcamlyYS1kaXBsb20g4oCUINC60L7Qv9C40Y9cXHNyY1xcYXBwXFxhcGlcXHRhc2tzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcclxuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWFDbGllbnQnXHJcbmltcG9ydCB7IFRhc2tQcmlvcml0eUxldmVsLCBUYXNrQ3JpdGljYWxpdHlMZXZlbCwgVGFza1N0YXR1c0xldmVsIH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xyXG5pbXBvcnQgeyBnZXRDdXJyZW50VXNlciB9IGZyb20gJ0AvbGliL2F1dGhVdGlscyc7IFxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlcklkID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIocmVxKTtcclxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xyXG4gICAgY29uc29sZS5sb2coJ1JlcXVlc3QgQm9keTonLCBib2R5KTsgLy8g0JTQvtCx0LDQstC40Lwg0LvQvtCzINC00LvRjyDQvtGC0LvQsNC00LrQuFxyXG4gICAgaWYgKCF1c2VySWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICfQndC1INCw0LLRgtC+0YDQuNC30L7QstCw0L0nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICghYm9keS5uYW1lKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiAn0J3QsNC30LLQsNC90LjQtSDQt9Cw0LTQsNGH0Lgg0L7QsdGP0LfQsNGC0LXQu9GM0L3QvicgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQn9C+0LvRg9GH0LDQtdC8INC/0YDQvtGB0YLRgNCw0L3RgdGC0LLQviDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IHVzZXJJZCB9LFxyXG4gICAgICBzZWxlY3Q6IHsgc3BhY2VJZDogdHJ1ZSB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICfQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0L3QtSDQvdCw0LnQtNC10L0nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwNCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFza3MgPSBhd2FpdCBwcmlzbWEudGFzay5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgc3BhY2VJZDogdXNlci5zcGFjZUlkIC8vINCk0LjQu9GM0YLRgNGD0LXQvCDQv9C+INC/0YDQvtGB0YLRgNCw0L3RgdGC0LLRg1xyXG4gICAgICB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgYXV0aG9yOiB0cnVlLFxyXG4gICAgICAgIHdvcmtlcjogdHJ1ZSxcclxuICAgICAgICBncm91cDogdHJ1ZSxcclxuICAgICAgICBzcGFjZTogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgdGFza3MgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRhc2tzOicsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogJ9Ce0YjQuNCx0LrQsCDQt9Cw0LPRgNGD0LfQutC4INC30LDQtNCw0YcnIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1c2VySWQgPSBhd2FpdCBnZXRDdXJyZW50VXNlcihyZXEpO1xyXG4gICAgaWYgKCF1c2VySWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICfQndC1INCw0LLRgtC+0YDQuNC30L7QstCw0L0nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0J/QvtC70YPRh9Cw0LXQvCDQtNCw0L3QvdGL0LUg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcclxuICAgICAgc2VsZWN0OiB7IHNwYWNlSWQ6IHRydWUsIGNvbXBhbnlJZDogdHJ1ZSB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICfQn9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0L3QtSDQvdCw0LnQtNC10L0nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwNCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XHJcbiAgICBcclxuICAgIC8vINCS0LDQu9C40LTQsNGG0LjRjyDQtNCw0L3QvdGL0YVcclxuICAgIGlmICghYm9keS5uYW1lIHx8ICFib2R5Lmdyb3VwSWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgZXJyb3I6ICfQndC1INC30LDQv9C+0LvQvdC10L3RiyDQvtCx0Y/Qt9Cw0YLQtdC70YzQvdGL0LUg0L/QvtC70Y8nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3VGFzayA9IGF3YWl0IHByaXNtYS50YXNrLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBuYW1lOiBib2R5Lm5hbWUsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGJvZHkuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgY3JpdGljYWxpdHk6IGJvZHkuY3JpdGljYWxpdHkgYXMgVGFza0NyaXRpY2FsaXR5TGV2ZWwsXHJcbiAgICAgICAgcHJpb3JpdHk6IGJvZHkucHJpb3JpdHkgYXMgVGFza1ByaW9yaXR5TGV2ZWwsXHJcbiAgICAgICAgc3RhdHVzOiBib2R5LnN0YXR1cyBhcyBUYXNrU3RhdHVzTGV2ZWwsXHJcbiAgICAgICAgYXV0aG9ySWQ6IHVzZXJJZCwgLy8g0JjRgdC/0L7Qu9GM0LfRg9C10LwgSUQg0YLQtdC60YPRidC10LPQviDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuICAgICAgICBncm91cElkOiBOdW1iZXIoYm9keS5ncm91cElkKSxcclxuICAgICAgICBzcGFjZUlkOiB1c2VyLnNwYWNlSWQsIC8vINCY0YHQv9C+0LvRjNC30YPQtdC8INC/0YDQvtGB0YLRgNCw0L3RgdGC0LLQviDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuICAgICAgICBjcmVhdGVEYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgYXV0aG9yOiB0cnVlLFxyXG4gICAgICAgIGdyb3VwOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obmV3VGFzaywgeyBzdGF0dXM6IDIwMSB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignVGFzayBjcmVhdGlvbiBlcnJvcjonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgZXJyb3I6ICfQntGI0LjQsdC60LAg0YHQvtC30LTQsNC90LjRjyDQt9Cw0LTQsNGH0LgnIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiZ2V0Q3VycmVudFVzZXIiLCJHRVQiLCJyZXEiLCJ1c2VySWQiLCJib2R5IiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInN0YXR1cyIsIm5hbWUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaWQiLCJzZWxlY3QiLCJzcGFjZUlkIiwidGFza3MiLCJ0YXNrIiwiZmluZE1hbnkiLCJpbmNsdWRlIiwiYXV0aG9yIiwid29ya2VyIiwiZ3JvdXAiLCJzcGFjZSIsIlBPU1QiLCJjb21wYW55SWQiLCJncm91cElkIiwibmV3VGFzayIsImNyZWF0ZSIsImRhdGEiLCJkZXNjcmlwdGlvbiIsImNyaXRpY2FsaXR5IiwicHJpb3JpdHkiLCJhdXRob3JJZCIsIk51bWJlciIsImNyZWF0ZURhdGUiLCJEYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/tasks/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/authUtils.ts":
/*!******************************!*\
  !*** ./src/lib/authUtils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser)\n/* harmony export */ });\n/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokens */ \"(rsc)/./src/lib/tokens.ts\");\n\nconst getCurrentUser = async (req)=>{\n    const authHeader = req.headers.get('Authorization');\n    if (!authHeader?.startsWith('Bearer ')) return null;\n    const token = authHeader.split(' ')[1];\n    const decoded = (0,_tokens__WEBPACK_IMPORTED_MODULE_0__.verifyToken)(token);\n    if (!decoded) return null;\n    return decoded.userId;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGhVdGlscy50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUF1QztBQUdoQyxNQUFNQyxpQkFBaUIsT0FBT0M7SUFDbkMsTUFBTUMsYUFBYUQsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUM7SUFDbkMsSUFBSSxDQUFDRixZQUFZRyxXQUFXLFlBQVksT0FBTztJQUUvQyxNQUFNQyxRQUFRSixXQUFXSyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDdEMsTUFBTUMsVUFBVVQsb0RBQVdBLENBQUNPO0lBQzVCLElBQUksQ0FBQ0UsU0FBUyxPQUFPO0lBRXJCLE9BQU9BLFFBQVFDLE1BQU07QUFDdkIsRUFBRSIsInNvdXJjZXMiOlsiRjpcXEpTINCe0LHRg9GH0LXQvdC40LVcXFNoaXRwb3N0XFxqaXJhLWRpcGxvbSDigJQg0LrQvtC/0LjRj1xcc3JjXFxsaWJcXGF1dGhVdGlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2ZXJpZnlUb2tlbiB9IGZyb20gJy4vdG9rZW5zJztcclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRVc2VyID0gYXN5bmMgKHJlcTogUmVxdWVzdCkgPT4ge1xyXG4gIGNvbnN0IGF1dGhIZWFkZXIgPSByZXEuaGVhZGVycy5nZXQoJ0F1dGhvcml6YXRpb24nKTtcclxuICBpZiAoIWF1dGhIZWFkZXI/LnN0YXJ0c1dpdGgoJ0JlYXJlciAnKSkgcmV0dXJuIG51bGw7XHJcbiAgXHJcbiAgY29uc3QgdG9rZW4gPSBhdXRoSGVhZGVyLnNwbGl0KCcgJylbMV07XHJcbiAgY29uc3QgZGVjb2RlZCA9IHZlcmlmeVRva2VuKHRva2VuKTtcclxuICBpZiAoIWRlY29kZWQpIHJldHVybiBudWxsO1xyXG4gIFxyXG4gIHJldHVybiBkZWNvZGVkLnVzZXJJZDtcclxufTsiXSwibmFtZXMiOlsidmVyaWZ5VG9rZW4iLCJnZXRDdXJyZW50VXNlciIsInJlcSIsImF1dGhIZWFkZXIiLCJoZWFkZXJzIiwiZ2V0Iiwic3RhcnRzV2l0aCIsInRva2VuIiwic3BsaXQiLCJkZWNvZGVkIiwidXNlcklkIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/authUtils.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prismaClient.ts":
/*!*********************************!*\
  !*** ./src/lib/prismaClient.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n        datasources: {\n            db: {\n                url: process.env.DATABASE_URL\n            }\n        }\n    });\n};\nconst prisma = globalThis.prismaGlobal ?? prismaClientSingleton();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\nif (true) globalThis.prismaGlobal = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYUNsaWVudC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFFN0MsTUFBTUMsd0JBQXdCO0lBQzVCLE9BQU8sSUFBSUQsd0RBQVlBLENBQUM7UUFDdEJFLGFBQWE7WUFDWEMsSUFBSTtnQkFDRkMsS0FBS0MsUUFBUUMsR0FBRyxDQUFDQyxZQUFZO1lBQy9CO1FBQ0Y7SUFDRjtBQUNGO0FBTUEsTUFBTUMsU0FBU0MsV0FBV0MsWUFBWSxJQUFJVDtBQUUxQyxpRUFBZU8sTUFBTUEsRUFBQTtBQUVyQixJQUFJSCxJQUFxQyxFQUFFSSxXQUFXQyxZQUFZLEdBQUdGIiwic291cmNlcyI6WyJGOlxcSlMg0J7QsdGD0YfQtdC90LjQtVxcU2hpdHBvc3RcXGppcmEtZGlwbG9tIOKAlCDQutC+0L/QuNGPXFxzcmNcXGxpYlxccHJpc21hQ2xpZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xyXG5cclxuY29uc3QgcHJpc21hQ2xpZW50U2luZ2xldG9uID0gKCkgPT4ge1xyXG4gIHJldHVybiBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGRhdGFzb3VyY2VzOiB7XHJcbiAgICAgIGRiOiB7XHJcbiAgICAgICAgdXJsOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pXHJcbn1cclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICB2YXIgcHJpc21hR2xvYmFsOiB1bmRlZmluZWQgfCBSZXR1cm5UeXBlPHR5cGVvZiBwcmlzbWFDbGllbnRTaW5nbGV0b24+XHJcbn1cclxuXHJcbmNvbnN0IHByaXNtYSA9IGdsb2JhbFRoaXMucHJpc21hR2xvYmFsID8/IHByaXNtYUNsaWVudFNpbmdsZXRvbigpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmlzbWFcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxUaGlzLnByaXNtYUdsb2JhbCA9IHByaXNtYSJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWFDbGllbnRTaW5nbGV0b24iLCJkYXRhc291cmNlcyIsImRiIiwidXJsIiwicHJvY2VzcyIsImVudiIsIkRBVEFCQVNFX1VSTCIsInByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWFHbG9iYWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prismaClient.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/tokens.ts":
/*!***************************!*\
  !*** ./src/lib/tokens.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateTokens: () => (/* binding */ generateTokens),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nconst JWT_SECRET = process.env.JWT_SECRET || 'your_strong_secret_here';\nconst generateTokens = (userId)=>{\n    const accessToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({\n        userId\n    }, JWT_SECRET, {\n        expiresIn: '15m'\n    });\n    const refreshToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({\n        userId\n    }, JWT_SECRET, {\n        expiresIn: '7d'\n    });\n    return {\n        accessToken,\n        refreshToken\n    };\n};\nconst verifyToken = (token)=>{\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, JWT_SECRET);\n    } catch  {\n        return null;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3Rva2Vucy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQStCO0FBRS9CLE1BQU1DLGFBQWFDLFFBQVFDLEdBQUcsQ0FBQ0YsVUFBVSxJQUFJO0FBRXRDLE1BQU1HLGlCQUFpQixDQUFDQztJQUM3QixNQUFNQyxjQUFjTix3REFBUSxDQUFDO1FBQUVLO0lBQU8sR0FBR0osWUFBWTtRQUFFTyxXQUFXO0lBQU07SUFDeEUsTUFBTUMsZUFBZVQsd0RBQVEsQ0FBQztRQUFFSztJQUFPLEdBQUdKLFlBQVk7UUFBRU8sV0FBVztJQUFLO0lBQ3hFLE9BQU87UUFBRUY7UUFBYUc7SUFBYTtBQUNyQyxFQUFFO0FBRUssTUFBTUMsY0FBYyxDQUFDQztJQUMxQixJQUFJO1FBQ0YsT0FBT1gsMERBQVUsQ0FBQ1csT0FBT1Y7SUFDM0IsRUFBRSxPQUFNO1FBQ04sT0FBTztJQUNUO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsiRjpcXEpTINCe0LHRg9GH0LXQvdC40LVcXFNoaXRwb3N0XFxqaXJhLWRpcGxvbSDigJQg0LrQvtC/0LjRj1xcc3JjXFxsaWJcXHRva2Vucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcblxyXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCAneW91cl9zdHJvbmdfc2VjcmV0X2hlcmUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlVG9rZW5zID0gKHVzZXJJZDogbnVtYmVyKSA9PiB7XHJcbiAgY29uc3QgYWNjZXNzVG9rZW4gPSBqd3Quc2lnbih7IHVzZXJJZCB9LCBKV1RfU0VDUkVULCB7IGV4cGlyZXNJbjogJzE1bScgfSk7XHJcbiAgY29uc3QgcmVmcmVzaFRva2VuID0gand0LnNpZ24oeyB1c2VySWQgfSwgSldUX1NFQ1JFVCwgeyBleHBpcmVzSW46ICc3ZCcgfSk7XHJcbiAgcmV0dXJuIHsgYWNjZXNzVG9rZW4sIHJlZnJlc2hUb2tlbiB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHZlcmlmeVRva2VuID0gKHRva2VuOiBzdHJpbmcpID0+IHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGp3dC52ZXJpZnkodG9rZW4sIEpXVF9TRUNSRVQpIGFzIHsgdXNlcklkOiBudW1iZXIgfTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufTsiXSwibmFtZXMiOlsiand0IiwiSldUX1NFQ1JFVCIsInByb2Nlc3MiLCJlbnYiLCJnZW5lcmF0ZVRva2VucyIsInVzZXJJZCIsImFjY2Vzc1Rva2VuIiwic2lnbiIsImV4cGlyZXNJbiIsInJlZnJlc2hUb2tlbiIsInZlcmlmeVRva2VuIiwidG9rZW4iLCJ2ZXJpZnkiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/tokens.ts\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunk