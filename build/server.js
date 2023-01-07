module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "e21dc533b10b1003cad1";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "server";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./abis/MjlpManager.json":
/*!*******************************!*\
  !*** ./abis/MjlpManager.json ***!
  \*******************************/
/*! exports provided: _format, contractName, sourceName, abi, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_format\":\"hh-sol-artifact-1\",\"contractName\":\"MjlpManager\",\"sourceName\":\"contracts/core/MjlpManager.sol\",\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_vault\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_usdm\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_mjlp\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_cooldownDuration\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"aumInUsdm\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"mjlpSupply\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"usdmAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"mintAmount\",\"type\":\"uint256\"}],\"name\":\"AddLiquidity\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"mjlpAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"aumInUsdm\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"mjlpSupply\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"usdmAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amountOut\",\"type\":\"uint256\"}],\"name\":\"RemoveLiquidity\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"MAX_COOLDOWN_DURATION\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"PRICE_PRECISION\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"USDM_DECIMALS\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minUsdm\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minMjlp\",\"type\":\"uint256\"}],\"name\":\"addLiquidity\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_fundingAccount\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_account\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minUsdm\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minMjlp\",\"type\":\"uint256\"}],\"name\":\"addLiquidityForAccount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"aumAddition\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"aumDeduction\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"cooldownDuration\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"maximise\",\"type\":\"bool\"}],\"name\":\"getAum\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"maximise\",\"type\":\"bool\"}],\"name\":\"getAumInUsdm\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getAums\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"gov\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"inPrivateMode\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"isHandler\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"lastAddedAt\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"mjlp\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_tokenOut\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_mjlpAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minOut\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_receiver\",\"type\":\"address\"}],\"name\":\"removeLiquidity\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_account\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_tokenOut\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_mjlpAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minOut\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_receiver\",\"type\":\"address\"}],\"name\":\"removeLiquidityForAccount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_aumAddition\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_aumDeduction\",\"type\":\"uint256\"}],\"name\":\"setAumAdjustment\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_cooldownDuration\",\"type\":\"uint256\"}],\"name\":\"setCooldownDuration\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_gov\",\"type\":\"address\"}],\"name\":\"setGov\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_handler\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"_isActive\",\"type\":\"bool\"}],\"name\":\"setHandler\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"_inPrivateMode\",\"type\":\"bool\"}],\"name\":\"setInPrivateMode\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"usdm\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"vault\",\"outputs\":[{\"internalType\":\"contract IVault\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]}");

/***/ }),

/***/ "./abis/RewardReader.json":
/*!********************************!*\
  !*** ./abis/RewardReader.json ***!
  \********************************/
/*! exports provided: _format, contractName, sourceName, abi, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_format\":\"hh-sol-artifact-1\",\"contractName\":\"RewardReader\",\"sourceName\":\"contracts/peripherals/RewardReader.sol\",\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_account\",\"type\":\"address\"},{\"internalType\":\"address[]\",\"name\":\"_depositTokens\",\"type\":\"address[]\"},{\"internalType\":\"address[]\",\"name\":\"_rewardTrackers\",\"type\":\"address[]\"}],\"name\":\"getDepositBalances\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_account\",\"type\":\"address\"},{\"internalType\":\"address[]\",\"name\":\"_rewardTrackers\",\"type\":\"address[]\"}],\"name\":\"getStakingInfo\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_account\",\"type\":\"address\"},{\"internalType\":\"address[]\",\"name\":\"_vesters\",\"type\":\"address[]\"}],\"name\":\"getVestingInfoV2\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]}");

/***/ }),

/***/ "./abis/v1/Token.json":
/*!****************************!*\
  !*** ./abis/v1/Token.json ***!
  \****************************/
/*! exports provided: _format, contractName, sourceName, abi, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_format\":\"hh-sol-artifact-1\",\"contractName\":\"Token\",\"sourceName\":\"contracts/tokens/Token.sol\",\"abi\":[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"subtractedValue\",\"type\":\"uint256\"}],\"name\":\"decreaseAllowance\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"deposit\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"addedValue\",\"type\":\"uint256\"}],\"name\":\"increaseAllowance\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"withdrawToken\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]}");

/***/ }),

/***/ "./build/assets.json":
/*!***************************!*\
  !*** ./build/assets.json ***!
  \***************************/
/*! exports provided: client, noentry, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"client\":{\"js\":[\"http://localhost:3001/static/js/client.js\"],\"map\":[\"http://localhost:3001/static/js/client.js.map\"],\"chunks\":[\"client\"]},\"noentry\":{\"ttf\":[\"http://localhost:3001/static/media/Comfortaa-Bold.2df2dd0e.ttf\",\"http://localhost:3001/static/media/Comfortaa-Light.a32b6e45.ttf\",\"http://localhost:3001/static/media/Comfortaa-Medium.cca5f204.ttf\",\"http://localhost:3001/static/media/Comfortaa-Regular.26795cfa.ttf\",\"http://localhost:3001/static/media/Comfortaa-SemiBold.170d22d9.ttf\",\"http://localhost:3001/static/media/Philosopher-Bold.a3aed8ba.ttf\",\"http://localhost:3001/static/media/Philosopher-BoldItalic.fa16e091.ttf\",\"http://localhost:3001/static/media/Philosopher-Italic.b9e3037c.ttf\",\"http://localhost:3001/static/media/Philosopher-Regular.af6ea627.ttf\"],\"png\":[\"http://localhost:3001/static/media/anzor-logo.078fe1a9.png\"]}}");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/razzle-dev-utils/prettyNodeErrors.js":
/*!***********************************************************!*\
  !*** ./node_modules/razzle-dev-utils/prettyNodeErrors.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(/*! fs */ "fs");
const {
  getTopFrame,
  getStackTraceLines,
  separateMessageFromStack,
} = __webpack_require__(/*! jest-message-util */ "jest-message-util");
const { codeFrameColumns } = __webpack_require__(/*! @babel/code-frame */ "@babel/code-frame");

function pretty(error) {
  const { message, stack } = error;
  const lines = getStackTraceLines(stack);
  const topFrame = getTopFrame(lines);
  const fallback = `${message}${stack}`;

  if (!topFrame) {
    return fallback;
  }

  const { file, line } = topFrame;
  try {
    const result = codeFrameColumns(
      fs.readFileSync(file, 'utf8'),
      { start: { line } },
      { highlightCode: true }
    );
    return `\n${message}\n\n${result}\n${stack}\n`;
  } catch (error) {
    return fallback;
  }
}

function usePrettyErrors(transform) {
  const { prepareStackTrace } = Error;

  Error.prepareStackTrace = (error, trace) => {
    const prepared = prepareStackTrace
      ? separateMessageFromStack(prepareStackTrace(error, trace))
      : error;
    const transformed = transform ? transform(prepared) : prepared;
    return pretty(transformed);
  };
}

// Clean up Webpack's sourcemap namespacing in error stacks
// @see https://github.com/facebook/create-react-app/blob/next/packages/react-dev-utils/formatWebpackMessages.js#L112
const stackTransform = ({ stack = '', ...rest }) => ({
  stack: stack.replace('/build/webpack:', ''),
  ...rest,
});

usePrettyErrors(stackTransform);


/***/ }),

/***/ "./node_modules/razzle-start-server-webpack-plugin/dist/monitor-loader.js!./node_modules/razzle-start-server-webpack-plugin/dist/monitor-loader.js":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/razzle-start-server-webpack-plugin/dist/monitor-loader.js!./node_modules/razzle-start-server-webpack-plugin/dist/monitor-loader.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(() => {
  // Handle hot updates, copied with slight adjustments from webpack/hot/signal.js
  if (true) {
    const log = (type, msg) => console[type](`sswp> ${msg}`); // TODO don't show this when sending signal instead of message


    log('log', 'Handling Hot Module Reloading');

    var checkForUpdate = function checkForUpdate(fromUpdate) {
      module.hot.check().then(function (updatedModules) {
        if (!updatedModules) {
          if (fromUpdate) log('log', 'Update applied.');else log('warn', 'Cannot find update.');
          return;
        }

        return module.hot.apply({
          ignoreUnaccepted: true,
          // TODO probably restart
          onUnaccepted: function (data) {
            log('warn', '\u0007Ignored an update to unaccepted module ' + data.chain.join(' -> '));
          }
        }).then(function (renewedModules) {
          __webpack_require__(/*! webpack/hot/log-apply-result */ "webpack/hot/log-apply-result")(updatedModules, renewedModules);

          checkForUpdate(true);
        });
      }).catch(function (err) {
        var status = module.hot.status();

        if (['abort', 'fail'].indexOf(status) >= 0) {
          if (process.send) {
            process.send('SSWP_HMR_FAIL');
          }

          log('warn', 'Cannot apply update.');
          log('warn', '' + err.stack || err.message);
          log('error', 'Quitting process - will reload on next file change\u0007\n\u0007\n\u0007');
          process.exit(222);
        } else {
          log('warn', 'Update failed: ' + err.stack || false);
        }
      });
    };

    process.on('message', function (message) {
      if (message !== 'SSWP_HMR') return;

      if (module.hot.status() !== 'idle') {
        log('warn', 'Got signal but currently in ' + module.hot.status() + ' state.');
        log('warn', 'Need to be in idle state to start hot update.');
        return;
      }

      checkForUpdate();
    });
  } // Tell our plugin we loaded all the code without initially crashing


  if (process.send) {
    process.send('SSWP_LOADED');
  }
})()

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?300 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?300"))

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fonts_philosopher_Philosopher_BoldItalic_ttf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fonts/philosopher/Philosopher-BoldItalic.ttf */ "./src/fonts/philosopher/Philosopher-BoldItalic.ttf");
/* harmony import */ var _fonts_philosopher_Philosopher_BoldItalic_ttf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fonts_philosopher_Philosopher_BoldItalic_ttf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fonts_philosopher_Philosopher_Italic_ttf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fonts/philosopher/Philosopher-Italic.ttf */ "./src/fonts/philosopher/Philosopher-Italic.ttf");
/* harmony import */ var _fonts_philosopher_Philosopher_Italic_ttf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fonts_philosopher_Philosopher_Italic_ttf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fonts_philosopher_Philosopher_Regular_ttf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fonts/philosopher/Philosopher-Regular.ttf */ "./src/fonts/philosopher/Philosopher-Regular.ttf");
/* harmony import */ var _fonts_philosopher_Philosopher_Regular_ttf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fonts_philosopher_Philosopher_Regular_ttf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fonts_philosopher_Philosopher_Bold_ttf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fonts/philosopher/Philosopher-Bold.ttf */ "./src/fonts/philosopher/Philosopher-Bold.ttf");
/* harmony import */ var _fonts_philosopher_Philosopher_Bold_ttf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fonts_philosopher_Philosopher_Bold_ttf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fonts_comfortaa_Comfortaa_Regular_ttf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fonts/comfortaa/Comfortaa-Regular.ttf */ "./src/fonts/comfortaa/Comfortaa-Regular.ttf");
/* harmony import */ var _fonts_comfortaa_Comfortaa_Regular_ttf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fonts_comfortaa_Comfortaa_Regular_ttf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fonts_comfortaa_Comfortaa_Bold_ttf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fonts/comfortaa/Comfortaa-Bold.ttf */ "./src/fonts/comfortaa/Comfortaa-Bold.ttf");
/* harmony import */ var _fonts_comfortaa_Comfortaa_Bold_ttf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_fonts_comfortaa_Comfortaa_Bold_ttf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _fonts_comfortaa_Comfortaa_SemiBold_ttf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./fonts/comfortaa/Comfortaa-SemiBold.ttf */ "./src/fonts/comfortaa/Comfortaa-SemiBold.ttf");
/* harmony import */ var _fonts_comfortaa_Comfortaa_SemiBold_ttf__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fonts_comfortaa_Comfortaa_SemiBold_ttf__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _fonts_comfortaa_Comfortaa_Light_ttf__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./fonts/comfortaa/Comfortaa-Light.ttf */ "./src/fonts/comfortaa/Comfortaa-Light.ttf");
/* harmony import */ var _fonts_comfortaa_Comfortaa_Light_ttf__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_fonts_comfortaa_Comfortaa_Light_ttf__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _fonts_comfortaa_Comfortaa_Medium_ttf__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./fonts/comfortaa/Comfortaa-Medium.ttf */ "./src/fonts/comfortaa/Comfortaa-Medium.ttf");
/* harmony import */ var _fonts_comfortaa_Comfortaa_Medium_ttf__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_fonts_comfortaa_Comfortaa_Medium_ttf__WEBPACK_IMPORTED_MODULE_11__);
// Imports












var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_philosopher_Philosopher_BoldItalic_ttf__WEBPACK_IMPORTED_MODULE_3___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_philosopher_Philosopher_Italic_ttf__WEBPACK_IMPORTED_MODULE_4___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_philosopher_Philosopher_Regular_ttf__WEBPACK_IMPORTED_MODULE_5___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_philosopher_Philosopher_Bold_ttf__WEBPACK_IMPORTED_MODULE_6___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_comfortaa_Comfortaa_Regular_ttf__WEBPACK_IMPORTED_MODULE_7___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_comfortaa_Comfortaa_Bold_ttf__WEBPACK_IMPORTED_MODULE_8___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_comfortaa_Comfortaa_SemiBold_ttf__WEBPACK_IMPORTED_MODULE_9___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_comfortaa_Comfortaa_Light_ttf__WEBPACK_IMPORTED_MODULE_10___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_comfortaa_Comfortaa_Medium_ttf__WEBPACK_IMPORTED_MODULE_11___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('truetype');\r\n  font-weight: bold;\r\n  font-style: italic;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('truetype');\r\n  font-weight: normal;\r\n  font-style: italic;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('truetype');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('truetype');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format('truetype');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format('truetype');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format('truetype');\r\n  font-weight: 300;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format('truetype');\r\n  font-weight: 500;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\nbody {\r\n  font-size: 0.9rem;\r\n  /* background: #f6f9ff; */\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: 'Comfortaa', sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n}\r\n\r\n.recharts-wrapper {\r\n  font-size: 0.8rem;\r\n  font-family: 'Comfortaa', monospace;\r\n}\r\n\r\n.recharts-legend-item-text {\r\n  display: inline-block;\r\n  max-width: 150px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  vertical-align: middle;\r\n}\r\n\r\n.App {\r\n  color: #000;\r\n  background: #fcfcfc;\r\n  line-height: 1.15;\r\n  padding: 1rem;\r\n  padding-top: 0;\r\n}\r\n\r\n.App.dark {\r\n  background: #000000;\r\n  color: #FFF;\r\n  line-height: 1.15;\r\n  box-sizing: border-box;\r\n  min-height: 100vh;\r\n}\r\n\r\nh3, h2 {\r\n  color: #444;\r\n  margin: 1rem 0 1.5rem;\r\n}\r\n\r\n.App.dark h3, .App.dark h2 {\r\n  color: white;\r\n}\r\n\r\nh3 {\r\n  margin: 1rem 0;\r\n  font-weight: normal;\r\n  font-size: 1.2rem;\r\n}\r\n\r\nh2 {\r\n  font-size: 1.6rem;\r\n  font-weight: normal\r\n}\r\n\r\nlabel {\r\n  cursor: pointer;\r\n}\r\n\r\ninput + label,\r\nlabel + input {\r\n  margin-left: 0.5rem;\r\n}\r\n\r\n.chart-subtitle, .stats {\r\n  margin: 1.5rem 0 1rem;\r\n}\r\n\r\n.chart-description {\r\n  margin: 1rem 0 0;\r\n  max-width: 600px;\r\n  /* color: #ffffff; */\r\n}\r\n\r\n.App.dark .chart-description {\r\n  color: #ffffff;\r\n}\r\n\r\n.chart-description p:first-child {\r\n  margin-top: 0;\r\n}\r\n\r\n.chart-description p:last-child {\r\n  margin-bottom: 0;\r\n}\r\n\r\n.chart-description ul {\r\n  margin: 0;\r\n  padding-left: 20px;\r\n}\r\n\r\n.chart-description li {\r\n  margin-top: 5px;\r\n}\r\n\r\n.chart-grid {\r\n  color: #16182E;\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n  gap: 1rem;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.chart-grid-subtitle {\r\n  grid-column-start: 1;\r\n  grid-column-end: 9;\r\n  margin-bottom: 0;\r\n  margin-top: 2rem;\r\n}\r\n\r\n.total-stat-value {\r\n  font-size: 1.5rem;\r\n  overflow: hidden;\r\n  white-space: pre-wrap;\r\n}\r\n\r\n.total-stat-delta {\r\n  font-size: 0.875rem;\r\n  line-height: 1.125rem;\r\n  display: block;\r\n}\r\n\r\n.total-stat-delta.plus {\r\n  color: #46E3AE;\r\n}\r\n.App.light .total-stat-delta.plus {\r\n  color: rgb(34 199 97);\r\n}\r\n.total-stat-delta.minus {\r\n  color: #727171;\r\n}\r\n\r\n.App.dark .chart-cell {\r\n  background: #181818;\r\n  border: none;\r\n  color: white;\r\n}\r\n\r\n.App.dark .chart-cell.stats {\r\n  border: 1px solid #FFFFFF14;\r\n}\r\n\r\n.chart-cell {\r\n  margin: 0;\r\n  border-radius: 15px;\r\n  border: 1px solid #FFFFFF14;\r\n  background: #181818;\r\n  position: relative;\r\n  padding: 1rem;\r\n  grid-column-start: span 5;\r\n}\r\n\r\n.chart-cell.stats {\r\n  min-height: 60px;\r\n  grid-column-start: span 2;\r\n  text-align: center;\r\n}\r\n\r\n.chart-cell.experiment {\r\n  border-color: #fbb;\r\n}\r\n.chart-cell.experiment:after {\r\n  color: #f55;\r\n  top: 1rem;\r\n  right: 1rem;\r\n  position: absolute;\r\n  content: '(experimental)';\r\n}\r\n\r\n.chart-cell h3 {\r\n  margin-top: 0;\r\n  letter-spacing: 0px;\r\n  font-size: 1.125rem;\r\n  line-height: 1.4375rem;\r\n}\r\n\r\n.chart-cell .csv-link {\r\n  cursor: pointer;\r\n  font-size: 0.9rem;\r\n  margin-left: 0.3rem;\r\n  opacity: 0.5;\r\n  display: inline-flex;\r\n  vertical-align: middle;\r\n}\r\n.chart-cell:hover .csv-link {\r\n  opacity: 0.5;\r\n}\r\n.chart-cell .csv-link:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.form input[type=\"date\"],\r\n.form input[type=\"text\"] {\r\n  border: 1px solid #aaa;\r\n  border-radius: 3px;\r\n  appearance: none !important;\r\n  box-sizing: border-box;\r\n  padding: 3px;\r\n}\r\n\r\n.form button {\r\n  border: none;\r\n  appearance: none !important;\r\n  color: #000;\r\n  border: 1px solid #FFFFFF0F;\r\n  box-sizing: border-box;\r\n  background: #b39a31;\r\n  cursor: pointer;\r\n  margin-left: 10px;\r\n  height: 28px;\r\n  border-radius: 3px;\r\n  padding: 3px 7px;\r\n}\r\n.form button:hover {\r\n  opacity: 0.9;\r\n}\r\n\r\n@keyframes loader {\r\n  from {\r\n    transform: rotate(0);\r\n  }\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.loader {\r\n  animation: loader 1.5s infinite;\r\n  opacity: 0.3;\r\n}\r\n.chart-cell .loader {\r\n  position: absolute;\r\n  margin-left: -1.5em;\r\n  margin-top: -1.5em;\r\n  font-size: 0.7rem;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: 2;\r\n}\r\n\r\n\r\n.warning, .warning a {\r\n  color: #e46b00;\r\n}\r\n\r\n.nav {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 0 -1rem 0;\r\n  height: 55px;\r\n  padding-left: 1rem;\r\n  padding-right: 1rem;\r\n  border-bottom: 1px solid #ffffff;\r\n  background-color: white;\r\n}\r\n\r\n.App.dark .nav {\r\n  background: #000000;\r\n  border-bottom: 1px solid #FFFFFF29;\r\n}\r\n\r\n.nav-logo {\r\n  /* width: 87px; */\r\n  vertical-align: middle;\r\n  margin: 0px 0.5rem 0 0;\r\n  display: inline-flex;\r\n  font-family: 'Philosopher';\r\n  /* letter-spacing: 3px; */\r\n  font-weight: bold;\r\n}\r\n\r\n.nav-logo img {\r\n  width: 87px;\r\n}\r\n\r\na, a:active, a:visited {\r\n  color: #16182E;\r\n}\r\n\r\n.nav-link {\r\n  letter-spacing: 0.47px;\r\n  color: #ffffff;\r\n  /* color: #000; */\r\n  text-decoration: none;\r\n  padding: 0.5rem 1rem;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  font-size: 15px;\r\n  line-height: 1.125rem;\r\n  letter-spacing: 0.47px;\r\n}\r\n\r\n.nav-link:active, .nav-link:visited {\r\n  color: #ffffff;\r\n}\r\n\r\n.nav-link.active {\r\n  color: #444;\r\n}\r\n\r\n.App.dark a, .App.dark a:active, .App.dark a:visited {\r\n  color: #FFFFFF;\r\n}\r\n\r\n.App.dark .nav-link {\r\n  color: #ffffff;\r\n}\r\n\r\n.App.dark .nav-link:active, .App.dark .nav-link:visited {\r\n  color: #ffffff;\r\n}\r\n\r\n.App.dark .nav-link.active {\r\n  color: white;\r\n}\r\n\r\n.App.dark .nav-link:hover {\r\n  color: white;\r\n}\r\n\r\n.nav-link:hover {\r\n  color: #444;\r\n}\r\n\r\n.nav-right {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.modeselect {\r\n  width: 30px;\r\n  height: 26px;\r\n  background: #16182E 0% 0% no-repeat padding-box;\r\n  border: 1px solid #FFFFFF0F;\r\n  border-radius: 4px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n}\r\n\r\n.App.dark .modeselect {\r\n  background: #FFFFFF 0% 0% no-repeat padding-box;\r\n}\r\n\r\n.modeselect svg {\r\n  fill: #ffffff;\r\n}\r\n\r\n.App.dark .modeselect svg {\r\n  fill: #FFFFFF0F;\r\n}\r\n\r\n.page-title {\r\n  font-size: 1.8125rem;\r\n  line-height: 2.3125rem;\r\n}\r\n\r\n.recharts-cartesian-axis-tick-value {\r\n  font-size: 0.75rem;\r\n}\r\n\r\n.App.dark .recharts-cartesian-axis-tick-value {\r\n  fill: #fff;\r\n  font-size: 0.75rem;\r\n}\r\n\r\n.App.dark .recharts-cartesian-grid-horizontal line, .App.dark .recharts-cartesian-grid-vertical line {\r\n  stroke: #FFFFFF0F;\r\n}\r\n\r\n.recharts-tooltip-wrapper .recharts-default-tooltip {\r\n  padding: 5px 12px!important;\r\n}\r\n\r\n.recharts-tooltip-wrapper ul.recharts-tooltip-item-list li {\r\n  padding: 0px!important;\r\n  font-size: 12px!important;\r\n  line-height: 15px!important;\r\n}\r\n\r\n.recharts-tooltip-wrapper ul.recharts-tooltip-item-list li + li {\r\n  margin-top: 1px!important;\r\n}\r\n\r\n.App.dark .recharts-tooltip-wrapper .recharts-default-tooltip {\r\n  background-color: #00000029!important;\r\n  box-shadow: 0px 3px 6px #0000005C;\r\n  border: 1px solid #484B6E!important;\r\n  border-radius: 4px;\r\n}\r\n\r\n.App-header-drawer {\r\n  background: #000000 0% 0% no-repeat padding-box;\r\n  box-shadow: 8px 3px 6px #00000029;\r\n  opacity: 1;\r\n  backdrop-filter: blur(27px);\r\n  position: fixed;\r\n  z-index: 11;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n  height: 100vh;\r\n  width: 304px;\r\n}\r\n\r\n.App-header-drawer .App-header-link-container a {\r\n  font-size: 14px;\r\n  line-height: 18px;\r\n  font-weight: normal;\r\n  letter-spacing: 0.1px;\r\n  color: #ffffff;\r\n  padding: 15px 16px;\r\n  text-decoration: none;\r\n  display: block;\r\n}\r\n\r\n.App-header-drawer .App-header-link-container a:hover,\r\n.App-header-drawer .App-header-link-container a:focus,\r\n.App-header-drawer .App-header-link-container a.active {\r\n  background: #181818;\r\n  color: white;\r\n}\r\n\r\n.App-header-drawer .App-header-menu-icon {\r\n  color: white;\r\n  margin: unset;\r\n  font-size: 2rem;\r\n}\r\n\r\n.App-header-drawer .App-header-link-main {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.App-header-links-header {\r\n  height: 62px;\r\n  display: flex;\r\n  align-items: center;\r\n  z-index: 3;\r\n  padding-left: 1rem;\r\n  padding-right: 1rem;\r\n}\r\n\r\n.App-header-menu-icon {\r\n  color: black;\r\n  font-size: 1.3rem;\r\n  cursor: pointer;\r\n  opacity: 0.7;\r\n  margin: 9px 10px;\r\n}\r\n\r\n.App.dark .App-header-menu-icon {\r\n  color: white;\r\n}\r\n\r\n.App-header-menu-icon:hover {\r\n  opacity: 0.9;\r\n}\r\n\r\n@media all and (max-width: 1000px) {\r\n  .chart-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n\r\n  .chart-cell {\r\n    grid-column-start: span 2;\r\n    grid-column-end: auto;\r\n  }\r\n  .chart-cell.stats {\r\n    grid-column-start: span 1;\r\n  }\r\n}\r\n\r\n.content {\r\n  margin-top: 1rem;\r\n}\r\n\r\n.App-header-menu-icon-block {\r\n  display: none;\r\n}\r\n\r\n.App-header-backdrop {\r\n  position: fixed;\r\n  z-index: 10;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n\r\n@media all and (max-width: 600px) {\r\n  .chart-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .chart-cell {\r\n    grid-column-start: unset!important;\r\n    grid-column-end: unset!important;\r\n  }\r\n\r\n  .App-header-menu-icon-block {\r\n    display: flex;\r\n    align-items: center;\r\n    margin-right: 0.5rem;\r\n  }\r\n\r\n  .nav-left {\r\n    display: flex;\r\n    align-items: center;\r\n  }\r\n\r\n  .nav-logo {\r\n    display: flex;\r\n  }\r\n\r\n  .nav-left .nav-link {\r\n    display: none;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/App.css"],"names":[],"mappings":"AAAA;EACE,0BAA0B;EAC1B,+DAA6E;EAC7E,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,0BAA0B;EAC1B,+DAAyE;EACzE,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,0BAA0B;EAC1B,+DAA0E;EAC1E,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,0BAA0B;EAC1B,+DAAuE;EACvE,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,+DAAsE;EACtE,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,+DAAmE;EACnE,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,+DAAuE;EACvE,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,+DAAoE;EACpE,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,+DAAqE;EACrE,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,yBAAyB;EACzB,SAAS;EACT,UAAU;EACV,oCAAoC;EACpC,mCAAmC;AACrC;;AAEA;EACE,iBAAiB;EACjB,mCAAmC;AACrC;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,uBAAuB;EACvB,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,mBAAmB;EACnB,iBAAiB;EACjB,aAAa;EACb,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,WAAW;EACX,iBAAiB;EACjB,sBAAsB;EACtB,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,qBAAqB;AACvB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;EACd,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB;AACF;;AAEA;EACE,eAAe;AACjB;;AAEA;;EAEE,mBAAmB;AACrB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,SAAS;EACT,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,cAAc;EACd,aAAa;EACb,sCAAsC;EACtC,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,qBAAqB;AACvB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,SAAS;EACT,mBAAmB;EACnB,2BAA2B;EAC3B,mBAAmB;EACnB,kBAAkB;EAClB,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,gBAAgB;EAChB,yBAAyB;EACzB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB;AACA;EACE,WAAW;EACX,SAAS;EACT,WAAW;EACX,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,oBAAoB;EACpB,sBAAsB;AACxB;AACA;EACE,YAAY;AACd;AACA;EACE,UAAU;AACZ;;AAEA;;EAEE,sBAAsB;EACtB,kBAAkB;EAClB,2BAA2B;EAC3B,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,2BAA2B;EAC3B,WAAW;EACX,2BAA2B;EAC3B,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;AAClB;AACA;EACE,YAAY;AACd;;AAEA;EACE;IACE,oBAAoB;EACtB;EACA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,+BAA+B;EAC/B,YAAY;AACd;AACA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;EACjB,QAAQ;EACR,SAAS;EACT,UAAU;AACZ;;;AAGA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,gCAAgC;EAChC,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;EACnB,kCAAkC;AACpC;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;EACtB,sBAAsB;EACtB,oBAAoB;EACpB,0BAA0B;EAC1B,yBAAyB;EACzB,iBAAiB;AACnB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,sBAAsB;EACtB,cAAc;EACd,iBAAiB;EACjB,qBAAqB;EACrB,oBAAoB;EACpB,qBAAqB;EACrB,sBAAsB;EACtB,eAAe;EACf,qBAAqB;EACrB,sBAAsB;AACxB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,+CAA+C;EAC/C,2BAA2B;EAC3B,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,+CAA+C;AACjD;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,oBAAoB;EACpB,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,sBAAsB;EACtB,yBAAyB;EACzB,2BAA2B;AAC7B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,qCAAqC;EACrC,iCAAiC;EACjC,mCAAmC;EACnC,kBAAkB;AACpB;;AAEA;EACE,+CAA+C;EAC/C,iCAAiC;EACjC,UAAU;EACV,2BAA2B;EAC3B,eAAe;EACf,WAAW;EACX,OAAO;EACP,QAAQ;EACR,MAAM;EACN,aAAa;EACb,YAAY;AACd;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,qBAAqB;EACrB,cAAc;EACd,kBAAkB;EAClB,qBAAqB;EACrB,cAAc;AAChB;;AAEA;;;EAGE,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,UAAU;EACV,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE;IACE,aAAa;IACb,qCAAqC;EACvC;;EAEA;IACE,yBAAyB;IACzB,qBAAqB;EACvB;EACA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,WAAW;EACX,MAAM;EACN,SAAS;EACT,OAAO;EACP,QAAQ;AACV;;AAEA;EACE;IACE,aAAa;IACb,0BAA0B;EAC5B;;EAEA;IACE,kCAAkC;IAClC,gCAAgC;EAClC;;EAEA;IACE,aAAa;IACb,mBAAmB;IACnB,oBAAoB;EACtB;;EAEA;IACE,aAAa;IACb,mBAAmB;EACrB;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,aAAa;EACf;AACF","sourcesContent":["@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url('./fonts/philosopher/Philosopher-BoldItalic.ttf') format('truetype');\r\n  font-weight: bold;\r\n  font-style: italic;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url('./fonts/philosopher/Philosopher-Italic.ttf') format('truetype');\r\n  font-weight: normal;\r\n  font-style: italic;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url('./fonts/philosopher/Philosopher-Regular.ttf') format('truetype');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url('./fonts/philosopher/Philosopher-Bold.ttf') format('truetype');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url('./fonts/comfortaa/Comfortaa-Regular.ttf') format('truetype');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url('./fonts/comfortaa/Comfortaa-Bold.ttf') format('truetype');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url('./fonts/comfortaa/Comfortaa-SemiBold.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url('./fonts/comfortaa/Comfortaa-Light.ttf') format('truetype');\r\n  font-weight: 300;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url('./fonts/comfortaa/Comfortaa-Medium.ttf') format('truetype');\r\n  font-weight: 500;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\nbody {\r\n  font-size: 0.9rem;\r\n  /* background: #f6f9ff; */\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: 'Comfortaa', sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n}\r\n\r\n.recharts-wrapper {\r\n  font-size: 0.8rem;\r\n  font-family: 'Comfortaa', monospace;\r\n}\r\n\r\n.recharts-legend-item-text {\r\n  display: inline-block;\r\n  max-width: 150px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  vertical-align: middle;\r\n}\r\n\r\n.App {\r\n  color: #000;\r\n  background: #fcfcfc;\r\n  line-height: 1.15;\r\n  padding: 1rem;\r\n  padding-top: 0;\r\n}\r\n\r\n.App.dark {\r\n  background: #000000;\r\n  color: #FFF;\r\n  line-height: 1.15;\r\n  box-sizing: border-box;\r\n  min-height: 100vh;\r\n}\r\n\r\nh3, h2 {\r\n  color: #444;\r\n  margin: 1rem 0 1.5rem;\r\n}\r\n\r\n.App.dark h3, .App.dark h2 {\r\n  color: white;\r\n}\r\n\r\nh3 {\r\n  margin: 1rem 0;\r\n  font-weight: normal;\r\n  font-size: 1.2rem;\r\n}\r\n\r\nh2 {\r\n  font-size: 1.6rem;\r\n  font-weight: normal\r\n}\r\n\r\nlabel {\r\n  cursor: pointer;\r\n}\r\n\r\ninput + label,\r\nlabel + input {\r\n  margin-left: 0.5rem;\r\n}\r\n\r\n.chart-subtitle, .stats {\r\n  margin: 1.5rem 0 1rem;\r\n}\r\n\r\n.chart-description {\r\n  margin: 1rem 0 0;\r\n  max-width: 600px;\r\n  /* color: #ffffff; */\r\n}\r\n\r\n.App.dark .chart-description {\r\n  color: #ffffff;\r\n}\r\n\r\n.chart-description p:first-child {\r\n  margin-top: 0;\r\n}\r\n\r\n.chart-description p:last-child {\r\n  margin-bottom: 0;\r\n}\r\n\r\n.chart-description ul {\r\n  margin: 0;\r\n  padding-left: 20px;\r\n}\r\n\r\n.chart-description li {\r\n  margin-top: 5px;\r\n}\r\n\r\n.chart-grid {\r\n  color: #16182E;\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n  gap: 1rem;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.chart-grid-subtitle {\r\n  grid-column-start: 1;\r\n  grid-column-end: 9;\r\n  margin-bottom: 0;\r\n  margin-top: 2rem;\r\n}\r\n\r\n.total-stat-value {\r\n  font-size: 1.5rem;\r\n  overflow: hidden;\r\n  white-space: pre-wrap;\r\n}\r\n\r\n.total-stat-delta {\r\n  font-size: 0.875rem;\r\n  line-height: 1.125rem;\r\n  display: block;\r\n}\r\n\r\n.total-stat-delta.plus {\r\n  color: #46E3AE;\r\n}\r\n.App.light .total-stat-delta.plus {\r\n  color: rgb(34 199 97);\r\n}\r\n.total-stat-delta.minus {\r\n  color: #727171;\r\n}\r\n\r\n.App.dark .chart-cell {\r\n  background: #181818;\r\n  border: none;\r\n  color: white;\r\n}\r\n\r\n.App.dark .chart-cell.stats {\r\n  border: 1px solid #FFFFFF14;\r\n}\r\n\r\n.chart-cell {\r\n  margin: 0;\r\n  border-radius: 15px;\r\n  border: 1px solid #FFFFFF14;\r\n  background: #181818;\r\n  position: relative;\r\n  padding: 1rem;\r\n  grid-column-start: span 5;\r\n}\r\n\r\n.chart-cell.stats {\r\n  min-height: 60px;\r\n  grid-column-start: span 2;\r\n  text-align: center;\r\n}\r\n\r\n.chart-cell.experiment {\r\n  border-color: #fbb;\r\n}\r\n.chart-cell.experiment:after {\r\n  color: #f55;\r\n  top: 1rem;\r\n  right: 1rem;\r\n  position: absolute;\r\n  content: '(experimental)';\r\n}\r\n\r\n.chart-cell h3 {\r\n  margin-top: 0;\r\n  letter-spacing: 0px;\r\n  font-size: 1.125rem;\r\n  line-height: 1.4375rem;\r\n}\r\n\r\n.chart-cell .csv-link {\r\n  cursor: pointer;\r\n  font-size: 0.9rem;\r\n  margin-left: 0.3rem;\r\n  opacity: 0.5;\r\n  display: inline-flex;\r\n  vertical-align: middle;\r\n}\r\n.chart-cell:hover .csv-link {\r\n  opacity: 0.5;\r\n}\r\n.chart-cell .csv-link:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.form input[type=\"date\"],\r\n.form input[type=\"text\"] {\r\n  border: 1px solid #aaa;\r\n  border-radius: 3px;\r\n  appearance: none !important;\r\n  box-sizing: border-box;\r\n  padding: 3px;\r\n}\r\n\r\n.form button {\r\n  border: none;\r\n  appearance: none !important;\r\n  color: #000;\r\n  border: 1px solid #FFFFFF0F;\r\n  box-sizing: border-box;\r\n  background: #b39a31;\r\n  cursor: pointer;\r\n  margin-left: 10px;\r\n  height: 28px;\r\n  border-radius: 3px;\r\n  padding: 3px 7px;\r\n}\r\n.form button:hover {\r\n  opacity: 0.9;\r\n}\r\n\r\n@keyframes loader {\r\n  from {\r\n    transform: rotate(0);\r\n  }\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.loader {\r\n  animation: loader 1.5s infinite;\r\n  opacity: 0.3;\r\n}\r\n.chart-cell .loader {\r\n  position: absolute;\r\n  margin-left: -1.5em;\r\n  margin-top: -1.5em;\r\n  font-size: 0.7rem;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: 2;\r\n}\r\n\r\n\r\n.warning, .warning a {\r\n  color: #e46b00;\r\n}\r\n\r\n.nav {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 0 -1rem 0;\r\n  height: 55px;\r\n  padding-left: 1rem;\r\n  padding-right: 1rem;\r\n  border-bottom: 1px solid #ffffff;\r\n  background-color: white;\r\n}\r\n\r\n.App.dark .nav {\r\n  background: #000000;\r\n  border-bottom: 1px solid #FFFFFF29;\r\n}\r\n\r\n.nav-logo {\r\n  /* width: 87px; */\r\n  vertical-align: middle;\r\n  margin: 0px 0.5rem 0 0;\r\n  display: inline-flex;\r\n  font-family: 'Philosopher';\r\n  /* letter-spacing: 3px; */\r\n  font-weight: bold;\r\n}\r\n\r\n.nav-logo img {\r\n  width: 87px;\r\n}\r\n\r\na, a:active, a:visited {\r\n  color: #16182E;\r\n}\r\n\r\n.nav-link {\r\n  letter-spacing: 0.47px;\r\n  color: #ffffff;\r\n  /* color: #000; */\r\n  text-decoration: none;\r\n  padding: 0.5rem 1rem;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  font-size: 15px;\r\n  line-height: 1.125rem;\r\n  letter-spacing: 0.47px;\r\n}\r\n\r\n.nav-link:active, .nav-link:visited {\r\n  color: #ffffff;\r\n}\r\n\r\n.nav-link.active {\r\n  color: #444;\r\n}\r\n\r\n.App.dark a, .App.dark a:active, .App.dark a:visited {\r\n  color: #FFFFFF;\r\n}\r\n\r\n.App.dark .nav-link {\r\n  color: #ffffff;\r\n}\r\n\r\n.App.dark .nav-link:active, .App.dark .nav-link:visited {\r\n  color: #ffffff;\r\n}\r\n\r\n.App.dark .nav-link.active {\r\n  color: white;\r\n}\r\n\r\n.App.dark .nav-link:hover {\r\n  color: white;\r\n}\r\n\r\n.nav-link:hover {\r\n  color: #444;\r\n}\r\n\r\n.nav-right {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.modeselect {\r\n  width: 30px;\r\n  height: 26px;\r\n  background: #16182E 0% 0% no-repeat padding-box;\r\n  border: 1px solid #FFFFFF0F;\r\n  border-radius: 4px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n}\r\n\r\n.App.dark .modeselect {\r\n  background: #FFFFFF 0% 0% no-repeat padding-box;\r\n}\r\n\r\n.modeselect svg {\r\n  fill: #ffffff;\r\n}\r\n\r\n.App.dark .modeselect svg {\r\n  fill: #FFFFFF0F;\r\n}\r\n\r\n.page-title {\r\n  font-size: 1.8125rem;\r\n  line-height: 2.3125rem;\r\n}\r\n\r\n.recharts-cartesian-axis-tick-value {\r\n  font-size: 0.75rem;\r\n}\r\n\r\n.App.dark .recharts-cartesian-axis-tick-value {\r\n  fill: #fff;\r\n  font-size: 0.75rem;\r\n}\r\n\r\n.App.dark .recharts-cartesian-grid-horizontal line, .App.dark .recharts-cartesian-grid-vertical line {\r\n  stroke: #FFFFFF0F;\r\n}\r\n\r\n.recharts-tooltip-wrapper .recharts-default-tooltip {\r\n  padding: 5px 12px!important;\r\n}\r\n\r\n.recharts-tooltip-wrapper ul.recharts-tooltip-item-list li {\r\n  padding: 0px!important;\r\n  font-size: 12px!important;\r\n  line-height: 15px!important;\r\n}\r\n\r\n.recharts-tooltip-wrapper ul.recharts-tooltip-item-list li + li {\r\n  margin-top: 1px!important;\r\n}\r\n\r\n.App.dark .recharts-tooltip-wrapper .recharts-default-tooltip {\r\n  background-color: #00000029!important;\r\n  box-shadow: 0px 3px 6px #0000005C;\r\n  border: 1px solid #484B6E!important;\r\n  border-radius: 4px;\r\n}\r\n\r\n.App-header-drawer {\r\n  background: #000000 0% 0% no-repeat padding-box;\r\n  box-shadow: 8px 3px 6px #00000029;\r\n  opacity: 1;\r\n  backdrop-filter: blur(27px);\r\n  position: fixed;\r\n  z-index: 11;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n  height: 100vh;\r\n  width: 304px;\r\n}\r\n\r\n.App-header-drawer .App-header-link-container a {\r\n  font-size: 14px;\r\n  line-height: 18px;\r\n  font-weight: normal;\r\n  letter-spacing: 0.1px;\r\n  color: #ffffff;\r\n  padding: 15px 16px;\r\n  text-decoration: none;\r\n  display: block;\r\n}\r\n\r\n.App-header-drawer .App-header-link-container a:hover,\r\n.App-header-drawer .App-header-link-container a:focus,\r\n.App-header-drawer .App-header-link-container a.active {\r\n  background: #181818;\r\n  color: white;\r\n}\r\n\r\n.App-header-drawer .App-header-menu-icon {\r\n  color: white;\r\n  margin: unset;\r\n  font-size: 2rem;\r\n}\r\n\r\n.App-header-drawer .App-header-link-main {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.App-header-links-header {\r\n  height: 62px;\r\n  display: flex;\r\n  align-items: center;\r\n  z-index: 3;\r\n  padding-left: 1rem;\r\n  padding-right: 1rem;\r\n}\r\n\r\n.App-header-menu-icon {\r\n  color: black;\r\n  font-size: 1.3rem;\r\n  cursor: pointer;\r\n  opacity: 0.7;\r\n  margin: 9px 10px;\r\n}\r\n\r\n.App.dark .App-header-menu-icon {\r\n  color: white;\r\n}\r\n\r\n.App-header-menu-icon:hover {\r\n  opacity: 0.9;\r\n}\r\n\r\n@media all and (max-width: 1000px) {\r\n  .chart-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n\r\n  .chart-cell {\r\n    grid-column-start: span 2;\r\n    grid-column-end: auto;\r\n  }\r\n  .chart-cell.stats {\r\n    grid-column-start: span 1;\r\n  }\r\n}\r\n\r\n.content {\r\n  margin-top: 1rem;\r\n}\r\n\r\n.App-header-menu-icon-block {\r\n  display: none;\r\n}\r\n\r\n.App-header-backdrop {\r\n  position: fixed;\r\n  z-index: 10;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n\r\n@media all and (max-width: 600px) {\r\n  .chart-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .chart-cell {\r\n    grid-column-start: unset!important;\r\n    grid-column-end: unset!important;\r\n  }\r\n\r\n  .App-header-menu-icon-block {\r\n    display: flex;\r\n    align-items: center;\r\n    margin-right: 0.5rem;\r\n  }\r\n\r\n  .nav-left {\r\n    display: flex;\r\n    align-items: center;\r\n  }\r\n\r\n  .nav-logo {\r\n    display: flex;\r\n  }\r\n\r\n  .nav-left .nav-link {\r\n    display: none;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ "framer-motion");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _views_Optimism__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/Optimism */ "./src/views/Optimism.js");
/* harmony import */ var _views_Referrals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/Referrals */ "./src/views/Referrals.js");
/* harmony import */ var _views_Trading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/Trading */ "./src/views/Trading.js");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./img/anzor-logo.png */ "./src/img/anzor-logo.png");
/* harmony import */ var _img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-icons/ri */ "react-icons/ri");
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_11__);
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\App.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }













function AppHeaderLinks({
  mode,
  small,
  clickCloseIcon
}) {
  return __jsx("div", {
    className: "App-header-links",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 5
    }
  }, small && __jsx("div", {
    className: "App-header-links-header",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "App-header-menu-icon-block",
    onClick: () => clickCloseIcon(),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 11
    }
  }, __jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_10__["FiX"], {
    className: "App-header-menu-icon",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  })), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    exact: true,
    activeClassName: "active",
    className: "App-header-link-main",
    to: "/",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 11
    }
  }, __jsx("img", {
    src: _img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8___default.a,
    alt: "MJAR Logo",
    style: {
      width: '40px',
      height: '40px'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }
  }))), __jsx("div", {
    className: "App-header-link-container",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  }, __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    to: "/",
    exact: true,
    className: "nav-link",
    activeClassName: "active",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 9
    }
  }, "Optimism")));
}
const App = () => {
  const {
    0: mode,
    1: setMode
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: isDrawerVisible,
    1: setIsDrawerVisible
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(undefined);
  const slideVariants = {
    hidden: {
      x: "-100%"
    },
    visible: {
      x: 0
    }
  };
  const fadeVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    }
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const savedMode = window.localStorage.getItem('mode');
    const targetMode = savedMode == 'light' ? 'light' : 'dark';
    document.querySelector('body').style.backgroundColor = targetMode == 'dark' ? '#000000' : '#f6f9ff';
    setMode(targetMode);
  }, []);
  return __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 5
    }
  }, mode && __jsx("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()("App", mode),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 17
    }
  }, isDrawerVisible && __jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__["AnimatePresence"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 13
    }
  }, isDrawerVisible && __jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__["motion"].div, {
    className: "App-header-backdrop",
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: fadeVariants,
    transition: {
      duration: 0.2
    },
    onClick: () => setIsDrawerVisible(!isDrawerVisible),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: "nav",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "nav-left",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "App-header-menu-icon-block",
    onClick: () => setIsDrawerVisible(!isDrawerVisible),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 15
    }
  }, !isDrawerVisible && __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_11__["RiMenuLine"], {
    className: "App-header-menu-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 38
    }
  }), isDrawerVisible && __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaTimes"], {
    className: "App-header-menu-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 37
    }
  })), __jsx("a", {
    href: "https://masonjar.finance",
    target: "_blank",
    rel: "noreferrer",
    className: "nav-logo",
    style: {
      textDecoration: 'none',
      alignItems: 'center'
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 15
    }
  }, __jsx("img", {
    style: {
      width: '40px',
      height: '40px'
    },
    src: mode == 'dark' ? _img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8___default.a : _img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8___default.a,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 17
    }
  }), __jsx("p", {
    style: {
      textDecoration: 'none',
      fontSize: '1.3rem',
      fontWeight: '40px'
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 17
    }
  }, "Mason Jar"))), __jsx("div", {
    className: "nav-right",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 13
    }
  }, __jsx("a", {
    href: "https://docs.masonjar.finance",
    target: "_blank",
    rel: "noreferrer",
    className: "nav-link",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 15
    }
  }, "Docs"), __jsx("a", {
    href: "https://masonjar.finance",
    target: "_blank",
    rel: "noreferrer",
    className: "nav-link",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 15
    }
  }, "Launch App"))), __jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__["AnimatePresence"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 11
    }
  }, isDrawerVisible && __jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__["motion"].div, {
    onClick: () => setIsDrawerVisible(false),
    className: "App-header-links-container App-header-drawer",
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: slideVariants,
    transition: {
      duration: 0.2
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 15
    }
  }, __jsx(AppHeaderLinks, {
    mode: mode,
    small: true,
    clickCloseIcon: () => setIsDrawerVisible(false),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "content",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 11
    }
  }, __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: "/",
    render: props => __jsx(_views_Optimism__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, props, {
      mode: mode,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 15
      }
    })),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 13
    }
  }), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: "/referrals/:chainName",
    render: props => __jsx(_views_Referrals__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, props, {
      mode: mode,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 15
      }
    })),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 13
    }
  }), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: "/trading",
    component: _views_Trading__WEBPACK_IMPORTED_MODULE_6__["default"],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 13
    }
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/addresses.js":
/*!**************************!*\
  !*** ./src/addresses.js ***!
  \**************************/
/*! exports provided: OPTIMISM, addresses, getAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPTIMISM", function() { return OPTIMISM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addresses", function() { return addresses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAddress", function() { return getAddress; });
const OPTIMISM = 10;
const addresses = {
  [OPTIMISM]: {
    MJAR: "0x9945Dd3eCB40A6b594813f2A4DF1643b10Fe3550",
    // DONE
    ES_MJAR: "",
    MJLP: "0x85CEF8dd0AaD49Fb4C04529f65D92177B936Da74",
    // DONE
    BN_MJAR: "",
    STAKED_MJAR_TRACKER: "",
    STAKED_MJLP_TRACKER: "",
    BONUS_MJAR_TRACKER: "",
    FEE_MJAR_TRACKER: "",
    FEE_MJLP_TRACKER: "",
    OP: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    BTC: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
    // 8 decimals wrapped btc
    ETH: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
    // 18 decimals wrapped eth
    RewardReader: "0xeF98e5d4F67633D6072c2a93e69A7F6a6179fD1b",
    MjlpManager: "0xCeF49b3f525d646924d20A4bC7B325dBb537e45A",
    // DONE
    Router: "0x5043C2470D7454F1678f6ecCCEE9D3D4588320cC",
    // DONE
    OrderBook: "0x286798570bf721c45A757B1de0B3149526c42273",
    // DONE
    PositionManager: "0x8F27c5F885B19279E12cdCbf29c9B0541dc563F3",
    // DONE
    FastPriceFeed: "",
    PositionRouter: "0xD30E4778512A0b24A34D355A5Ef28d337e96Bb95",
    // DONE
    PositionExecutorUpKeep: ""
  }
};
function getAddress(chainId, key) {
  if (!chainId in addresses) {
    throw new Error(`Unknown chain ${chainId}`);
  }
  if (!(key in addresses[chainId])) {
    throw new Error(`Unknown address key ${key}`);
  }
  return addresses[chainId][key];
}

/***/ }),

/***/ "./src/components/ChartWrapper.js":
/*!****************************************!*\
  !*** ./src/components/ChartWrapper.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChartWrapper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/ri */ "react-icons/ri");
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CsvLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CsvLink */ "./src/components/CsvLink.js");
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\components\\ChartWrapper.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


function ChartWrapper(props) {
  const {
    title,
    loading,
    csvFields,
    data
  } = props;
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("h3", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }
  }, title, __jsx(_CsvLink__WEBPACK_IMPORTED_MODULE_2__["default"], {
    fields: csvFields,
    name: title,
    data: data,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 9
    }
  })), loading && __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_1__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 19
    }
  }), props.children);
}

/***/ }),

/***/ "./src/components/CsvLink.js":
/*!***********************************!*\
  !*** ./src/components/CsvLink.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CsvLink; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/ri */ "react-icons/ri");
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var strftime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! strftime */ "strftime");
/* harmony import */ var strftime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(strftime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\components\\CsvLink.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



function formatTimestamp(timestamp) {
  return strftime__WEBPACK_IMPORTED_MODULE_2___default()('%Y-%m-%d', new Date(timestamp * 1000));
}
function getCsvUrl(data, fields) {
  const csvHeader = 'Date,' + fields.map(field => field.name || field.key).join(',');
  const csvBody = data.map(item => {
    return formatTimestamp(item.timestamp) + ',' + fields.map(field => item[field.key]).join(',');
  }).join('\n');
  const csv = csvHeader + '\n' + csvBody;
  return `data:application/octet-stream,${encodeURIComponent(csv)}`;
}
function CsvLink({
  data,
  fields,
  name = 'MJAR stats'
}) {
  const onClick = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(evt => {
    evt.preventDefault();
    const csvUrl = getCsvUrl(data, fields);
    const start = formatTimestamp(data[0].timestamp);
    const end = formatTimestamp(data[data.length - 1].timestamp);
    const fileName = `${name}_${start}_${end}.csv`;
    const aElement = document.createElement('a');
    aElement.href = csvUrl;
    aElement.download = fileName;
    document.body.appendChild(aElement);
    aElement.click();
    document.body.removeChild(aElement);
  }, [data, fields, name]);
  if (!data || data.length === 0 || !fields) {
    return null;
  }
  return __jsx("a", {
    title: "Download CSV",
    className: "csv-link",
    onClick: onClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 5
    }
  }, __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_1__["RiDownload2Fill"], {
    size: "1em",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }
  }));
}

/***/ }),

/***/ "./src/components/FeesChart.js":
/*!*************************************!*\
  !*** ./src/components/FeesChart.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FeesChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recharts */ "recharts");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ChartWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChartWrapper */ "./src/components/ChartWrapper.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\components\\FeesChart.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




function FeesChart(props) {
  const {
    data,
    loading,
    chartHeight,
    yaxisWidth,
    xaxisTickFormatter,
    yaxisTickFormatter,
    tooltipFormatter,
    tooltipLabelFormatter
  } = props;
  const csvFields = [{
    key: 'swap',
    name: 'Swap'
  }, {
    key: 'margin',
    name: 'Margin trading'
  }, {
    key: 'mint',
    name: 'Mint MJLP'
  }, {
    key: 'burn',
    name: 'Burn MJLP'
  }, {
    key: 'liquidation',
    name: 'Liquidation'
  }, {
    key: 'cumulative',
    name: 'Cumulative'
  }];
  return __jsx(_ChartWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Fees",
    loading: loading,
    csvFields: csvFields,
    data: data,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 10
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["ResponsiveContainer"], {
    width: "100%",
    height: chartHeight,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 5
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["ComposedChart"], {
    data: data,
    syncId: "syncA",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: xaxisTickFormatter,
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["YAxis"], {
    dataKey: "all",
    interval: "preserveStartEnd",
    tickCount: 7,
    tickFormatter: yaxisTickFormatter,
    width: yaxisWidth,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["YAxis"], {
    dataKey: "cumulative",
    orientation: "right",
    yAxisId: "right",
    tickFormatter: yaxisTickFormatter,
    width: yaxisWidth,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    formatter: tooltipFormatter,
    labelFormatter: tooltipLabelFormatter,
    contentStyle: {
      textAlign: 'left'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
    isAnimationActive: false,
    type: "monotone",
    dataKey: "swap",
    stackId: "a",
    name: "Swap",
    fill: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
    isAnimationActive: false,
    type: "monotone",
    dataKey: "mint",
    stackId: "a",
    name: "Mint MJLP",
    fill: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][1],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
    isAnimationActive: false,
    type: "monotone",
    dataKey: "burn",
    stackId: "a",
    name: "Burn MJLP",
    fill: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
    isAnimationActive: false,
    type: "monotone",
    dataKey: "liquidation",
    stackId: "a",
    name: "Liquidation",
    fill: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][3],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
    isAnimationActive: false,
    type: "monotone",
    dataKey: "margin",
    stackId: "a",
    name: "Margin trading",
    fill: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][4],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    strokeWidth: 3,
    dot: false,
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][0],
    dataKey: "cumulative",
    yAxisId: "right",
    name: "Cumulative",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 9
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 5
    }
  }, "Collected fees. USD value is calculated with token price at the moment of swap, trade, minting or redeeming MJLP"));
}

/***/ }),

/***/ "./src/components/GenericChart.js":
/*!****************************************!*\
  !*** ./src/components/GenericChart.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GenericChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recharts */ "recharts");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");
/* harmony import */ var _ChartWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChartWrapper */ "./src/components/ChartWrapper.js");
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\components\\GenericChart.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




function GenericChart(props) {
  const {
    loading,
    title,
    data,
    description,
    height = _helpers__WEBPACK_IMPORTED_MODULE_2__["CHART_HEIGHT"],
    yaxisWidth = _helpers__WEBPACK_IMPORTED_MODULE_2__["YAXIS_WIDTH"],
    yaxisDataKey = 'all',
    yaxisTickFormatter = _helpers__WEBPACK_IMPORTED_MODULE_2__["yaxisFormatter"],
    yaxisDomain,
    xaxisDataKey = 'timestamp',
    xaxisTickFormatter = _helpers__WEBPACK_IMPORTED_MODULE_2__["tooltipLabelFormatter"],
    tooltipFormatter = _helpers__WEBPACK_IMPORTED_MODULE_2__["tooltipFormatter"],
    tooltipLabelFormatter = _helpers__WEBPACK_IMPORTED_MODULE_2__["tooltipLabelFormatter"],
    items,
    type,
    syncId,
    children,
    rightYaxisDataKey,
    isCoinChart
  } = props;
  let ChartComponent;
  if (type === 'Line') {
    ChartComponent = recharts__WEBPACK_IMPORTED_MODULE_1__["LineChart"];
  } else if (type === 'Bar') {
    ChartComponent = recharts__WEBPACK_IMPORTED_MODULE_1__["BarChart"];
  } else {
    ChartComponent = recharts__WEBPACK_IMPORTED_MODULE_1__["ComposedChart"];
  }
  const htmlItems = (items || []).map((item, i) => {
    const props = {
      type: "monotone",
      dataKey: item.key,
      stackId: "a",
      name: item.name || item.key,
      fill: item.color || _helpers__WEBPACK_IMPORTED_MODULE_2__["COLORS"][i % _helpers__WEBPACK_IMPORTED_MODULE_2__["COLORS"].length],
      stroke: item.color || _helpers__WEBPACK_IMPORTED_MODULE_2__["COLORS"][i % _helpers__WEBPACK_IMPORTED_MODULE_2__["COLORS"].length],
      dot: item.dot || false,
      key: 'item-' + i,
      unit: item.unit,
      strokeWidth: item.strokeWidth,
      yAxisId: item.yAxisId
    };
    if (item.type === 'Line' || type === 'Line') {
      return __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Line"], _extends({}, props, {
        isAnimationActive: false,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 14
        }
      }));
    }
    return __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], _extends({}, props, {
      isAnimationActive: false,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 12
      }
    }));
  });
  const csvFields = items.map(item => ({
    key: item.key,
    name: item.name
  }));
  return __jsx(_ChartWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: title,
    loading: loading,
    data: data,
    csvFields: csvFields,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 10
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["ResponsiveContainer"], {
    width: "100%",
    height: height,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ChartComponent, {
    data,
    syncId
  }, [__jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["CartesianGrid"], {
    strokeDasharray: "10 10",
    key: "a",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["XAxis"], {
    dataKey: xaxisDataKey,
    tickFormatter: xaxisTickFormatter,
    minTickGap: 30,
    key: "b",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["YAxis"], {
    domain: yaxisDomain,
    dataKey: yaxisDataKey,
    tickFormatter: yaxisTickFormatter,
    key: "c",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 9
    }
  }), rightYaxisDataKey ? __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["YAxis"], {
    dataKey: rightYaxisDataKey,
    tickFormatter: yaxisTickFormatter,
    orientation: "right",
    yAxisId: "right",
    key: "c2",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 13
    }
  }) : null, __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    formatter: tooltipFormatter,
    labelFormatter: tooltipLabelFormatter,
    contentStyle: {
      textAlign: 'left'
    },
    key: "d",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Legend"], {
    key: "e",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 9
    }
  }), ...htmlItems, children])), description && __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 7
    }
  }, description));
}

/***/ }),

/***/ "./src/components/VolumeChart.js":
/*!***************************************!*\
  !*** ./src/components/VolumeChart.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VolumeChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recharts */ "recharts");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ChartWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChartWrapper */ "./src/components/ChartWrapper.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\components\\VolumeChart.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




function VolumeChart(props) {
  const {
    data,
    loading,
    chartHeight,
    yaxisWidth,
    xaxisTickFormatter,
    yaxisTickFormatter,
    tooltipFormatter,
    tooltipLabelFormatter
  } = props;
  const csvFields = [{
    key: 'swap',
    name: 'Swap'
  }, {
    key: 'margin',
    name: 'Margin trading'
  }, {
    key: 'mint',
    name: 'Mint MJLP'
  }, {
    key: 'burn',
    name: 'Burn MJLP'
  }, {
    key: 'liquidation',
    name: 'Liquidation'
  }, {
    key: 'cumulative',
    name: 'Cumulative'
  }];
  return __jsx(_ChartWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Volume",
    loading: loading,
    csvFields: csvFields,
    data: data,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 10
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["ResponsiveContainer"], {
    width: "100%",
    height: chartHeight,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 5
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["ComposedChart"], {
    data: data,
    syncId: "syncA",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: xaxisTickFormatter,
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["YAxis"], {
    dataKey: "all",
    interval: "preserveStartEnd",
    tickCount: 7,
    tickFormatter: yaxisTickFormatter,
    width: yaxisWidth,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["YAxis"], {
    dataKey: "cumulative",
    orientation: "right",
    yAxisId: "right",
    tickFormatter: yaxisTickFormatter,
    width: yaxisWidth,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    formatter: tooltipFormatter,
    labelFormatter: tooltipLabelFormatter,
    contentStyle: {
      textAlign: 'left'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
    isAnimationActive: false,
    type: "monotone",
    dataKey: "swap",
    stackId: "a",
    name: "Swap",
    fill: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
    isAnimationActive: false,
    type: "monotone",
    dataKey: "mint",
    stackId: "a",
    name: "Mint MJLP",
    fill: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][1],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
    isAnimationActive: false,
    type: "monotone",
    dataKey: "burn",
    stackId: "a",
    name: "Burn MJLP",
    fill: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
    isAnimationActive: false,
    type: "monotone",
    dataKey: "liquidation",
    stackId: "a",
    name: "Liquidation",
    fill: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][3],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
    isAnimationActive: false,
    type: "monotone",
    dataKey: "margin",
    stackId: "a",
    name: "Margin trading",
    fill: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][4],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 9
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_1__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    dot: false,
    strokeWidth: 3,
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_3__["COLORS"][0],
    dataKey: "cumulative",
    yAxisId: "right",
    name: "Cumulative",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 9
    }
  }))));
}

/***/ }),

/***/ "./src/dataProvider.js":
/*!*****************************!*\
  !*** ./src/dataProvider.js ***!
  \*****************************/
/*! exports provided: queryEarnData, tokenDecimals, tokenSymbols, useRequest, useCoingeckoPrices, useGraph, useLastBlock, useLastSubgraphBlock, useTradersData, useSwapSources, useTotalVolumeFromServer, getStatsFromSubgraph, useVolumeDataFromServer, useUsersData, useFundingRateData, useVolumeData, useFeesData, useAumPerformanceData, useMjlpData, useMjlpPerformanceData, useReferralsData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryEarnData", function() { return queryEarnData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenDecimals", function() { return tokenDecimals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenSymbols", function() { return tokenSymbols; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRequest", function() { return useRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCoingeckoPrices", function() { return useCoingeckoPrices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGraph", function() { return useGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLastBlock", function() { return useLastBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLastSubgraphBlock", function() { return useLastSubgraphBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTradersData", function() { return useTradersData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSwapSources", function() { return useSwapSources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTotalVolumeFromServer", function() { return useTotalVolumeFromServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStatsFromSubgraph", function() { return getStatsFromSubgraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useVolumeDataFromServer", function() { return useVolumeDataFromServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useUsersData", function() { return useUsersData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFundingRateData", function() { return useFundingRateData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useVolumeData", function() { return useVolumeData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFeesData", function() { return useFeesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAumPerformanceData", function() { return useAumPerformanceData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMjlpData", function() { return useMjlpData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMjlpPerformanceData", function() { return useMjlpPerformanceData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReferralsData", function() { return useReferralsData; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cross-fetch */ "cross-fetch");
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cross_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _addresses__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addresses */ "./src/addresses.js");
/* harmony import */ var _abis_RewardReader_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../abis/RewardReader.json */ "./abis/RewardReader.json");
var _abis_RewardReader_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../abis/RewardReader.json */ "./abis/RewardReader.json", 1);
/* harmony import */ var _abis_MjlpManager_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../abis/MjlpManager.json */ "./abis/MjlpManager.json");
var _abis_MjlpManager_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../abis/MjlpManager.json */ "./abis/MjlpManager.json", 1);
/* harmony import */ var _abis_v1_Token_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../abis/v1/Token.json */ "./abis/v1/Token.json");
var _abis_v1_Token_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../abis/v1/Token.json */ "./abis/v1/Token.json", 1);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






const {
  JsonRpcProvider
} = ethers__WEBPACK_IMPORTED_MODULE_4__["providers"];



const providers = {
  optimism: new JsonRpcProvider("https://rpc.ankr.com/optimism")
};
function getProvider(chainName) {
  if (!(chainName in providers)) {
    throw new Error(`Unknown chain ${chainName}`);
  }
  return providers["optimism"];
}
function getChainId(chainName) {
  const chainId = {
    optimism: _addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"]
  }[chainName];
  if (!chainId) {
    throw new Error(`Unknown chain ${chainName}`);
  }
  return chainId;
}
const DEFAULT_GROUP_PERIOD = 86400;
const NOW_TS = parseInt(Date.now() / 1000);
const FIRST_DATE_TS = parseInt(+new Date(2022, 5, 1) / 1000);
function fillNa(arr, keys) {
  const prevValues = {};
  if (!keys && arr.length > 0) {
    keys = Object.keys(arr[0]);
    delete keys.timestamp;
    delete keys.id;
  }
  for (const el of arr) {
    for (const key of keys) {
      if (!el[key]) {
        if (prevValues[key]) {
          el[key] = prevValues[key];
        }
      } else {
        prevValues[key] = el[key];
      }
    }
  }
  return arr;
}
async function queryEarnData(chainName, account) {
  const provider = getProvider(chainName);
  const chainId = getChainId(chainName);
  const rewardReader = new ethers__WEBPACK_IMPORTED_MODULE_4__["Contract"](Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(chainId, "RewardReader"), _abis_RewardReader_json__WEBPACK_IMPORTED_MODULE_6__.abi, provider);
  const mjlpContract = new ethers__WEBPACK_IMPORTED_MODULE_4__["Contract"](Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(chainId, "MJLP"), _abis_v1_Token_json__WEBPACK_IMPORTED_MODULE_8__.abi, provider);
  const mjlpManager = new ethers__WEBPACK_IMPORTED_MODULE_4__["Contract"](Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(chainId, "MjlpManager"), _abis_MjlpManager_json__WEBPACK_IMPORTED_MODULE_7__.abi, provider);
  let depositTokens;
  let rewardTrackersForDepositBalances;
  let rewardTrackersForStakingInfo;
  if (chainId === _addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"]) {
    depositTokens = [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "MJAR"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "ES_MJAR"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "STAKED_MJAR_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "BONUS_MJAR_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "BN_MJAR"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "MJLP")];
    rewardTrackersForDepositBalances = [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "STAKED_MJAR_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "STAKED_MJAR_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "BONUS_MJAR_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "FEE_MJAR_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "FEE_MJAR_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "FEE_MJLP_TRACKER")];
    rewardTrackersForStakingInfo = [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "STAKED_MJAR_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "BONUS_MJAR_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "FEE_MJAR_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "STAKED_MJLP_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "FEE_MJLP_TRACKER")];
  }
  const [balances, stakingInfo, mjlpTotalSupply, mjlpAum, mjarPrice] = await Promise.all([rewardReader.getDepositBalances(account, depositTokens, rewardTrackersForDepositBalances), rewardReader.getStakingInfo(account, rewardTrackersForStakingInfo).then(info => {
    return rewardTrackersForStakingInfo.map((_, i) => {
      return info.slice(i * 5, (i + 1) * 5);
    });
  }), mjlpContract.totalSupply(), mjlpManager.getAumInUsdm(true), cross_fetch__WEBPACK_IMPORTED_MODULE_3___default()("https://api.coingecko.com/api/v3/simple/price?ids=metavault-trade&vs_currencies=usd").then(async res => {
    const j = await res.json();
    return j["metavault-trade"]["usd"];
  })]);
  const mjlpPrice = mjlpAum / 1e18 / (mjlpTotalSupply / 1e18);
  const now = new Date();
  return {
    MJLP: {
      stakedMJLP: balances[5] / 1e18,
      pendingETH: stakingInfo[4][0] / 1e18,
      pendingEsMJAR: stakingInfo[3][0] / 1e18,
      mjlpPrice
    },
    MJAR: {
      stakedMJAR: balances[0] / 1e18,
      stakedEsMJAR: balances[1] / 1e18,
      pendingETH: stakingInfo[2][0] / 1e18,
      pendingEsMJAR: stakingInfo[0][0] / 1e18,
      mjarPrice
    },
    timestamp: parseInt(now / 1000),
    datetime: now.toISOString()
  };
}
const tokenDecimals = {
  "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83": 18,
  // WOP
  "0x74b23882a30290451A17c44f4F05243b6b58C76d": 18,
  // WETH
  "0x321162Cd933E2Be498Cd2267a90534A804051b11": 8,
  // BTC
  "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75": 6,
  // USDC
  "0x049d68029688eAbF473097a2fC38ef61633A3C7A": 6,
  // USDT
  "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E": 18 // DAI
};

const tokenSymbols = {
  // Optimism
  "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83": "WOP",
  "0x74b23882a30290451A17c44f4F05243b6b58C76d": "WETH",
  "0x321162Cd933E2Be498Cd2267a90534A804051b11": "WBTC",
  "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75": "USDC",
  "0x049d68029688eAbF473097a2fC38ef61633A3C7A": "USDT",
  "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E": "DAI"
};
function getTokenDecimals(token) {
  return tokenDecimals[token] || 18;
}
const knownSwapSources = {
  optimism: {
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "Router")]: "MJAR",
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "OrderBook")]: "MJAR",
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "PositionManager")]: "MJAR",
    // [getAddress(OPTIMISM, "OrderExecutor")]: "MJAR",
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "FastPriceFeed")]: "MJAR",
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "PositionExecutorUpKeep")]: "MJAR",
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["OPTIMISM"], "PositionRouter")]: "MJAR"
  }
};
const defaultFetcher = url => cross_fetch__WEBPACK_IMPORTED_MODULE_3___default()(url).then(res => res.json());
function useRequest(url, defaultValue, fetcher = defaultFetcher) {
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    0: data,
    1: setData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(defaultValue);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(async () => {
    try {
      setLoading(true);
      const data = await fetcher(url);
      setData(data);
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
    setLoading(false);
  }, [url]);
  return [data, loading, error];
}
function useCoingeckoPrices(symbol, {
  from = FIRST_DATE_TS
} = {}) {
  // token ids https://api.coingecko.com/api/v3/coins
  const _symbol = {
    BTC: "bitcoin",
    ETH: "ethereum",
    OP: "optimism",
    MATIC: "matic-network",
    WBTC: "wrapped-bitcoin",
    USDC: "usd-coin",
    USDT: "tether",
    DAI: "dai"
  }[symbol];
  const now = Date.now() / 1000;
  const days = Math.ceil(now / 86400) - Math.ceil(from / 86400) - 1;
  const url = `https://api.coingecko.com/api/v3/coins/${_symbol}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
  const [res, loading, error] = useRequest(url);
  const data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!res || res.length === 0) {
      return null;
    }
    const ret = res.prices.map(item => {
      // -1 is for shifting to previous day
      // because CG uses first price of the day, but for MJLP we store last price of the day
      const timestamp = item[0] - 1;
      const groupTs = parseInt(timestamp / 1000 / 86400) * 86400;
      return {
        timestamp: groupTs,
        value: item[1]
      };
    });
    return ret;
  }, [res]);
  return [data, loading, error];
}
function getImpermanentLoss(change) {
  return 2 * Math.sqrt(change) / (1 + change) - 1;
}
function getChainSubgraph(chainName) {
  // return "chimpydev/stats";
  return "chimpydev/core";
}
function useGraph(querySource, {
  subgraph = null,
  subgraphUrl = null,
  chainName = "optimism"
} = {}) {
  const query = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_1__["gql"])(querySource);
  if (!subgraphUrl) {
    if (!subgraph) {
      subgraph = getChainSubgraph(chainName);
    }
    subgraphUrl = `https://api.thegraph.com/subgraphs/name/${subgraph}`;
  }
  const client = new _apollo_client__WEBPACK_IMPORTED_MODULE_1__["ApolloClient"]({
    link: new _apollo_client__WEBPACK_IMPORTED_MODULE_1__["HttpLink"]({
      uri: subgraphUrl,
      fetch: (cross_fetch__WEBPACK_IMPORTED_MODULE_3___default())
    }),
    cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_1__["InMemoryCache"]()
  });
  const {
    0: data,
    1: setData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setLoading(true);
  }, [querySource, setLoading]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    client.query({
      query
    }).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(ex => {
      console.warn("Subgraph request failed error: %s subgraphUrl: %s", ex.message, subgraphUrl);
      setError(ex);
      setLoading(false);
    });
  }, [querySource, setData, setError, setLoading]);
  return [data, loading, error];
}
function useLastBlock(chainName = "optimism") {
  const {
    0: data,
    1: setData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    providers[chainName].getBlock().then(setData).catch(setError).finally(() => setLoading(false));
  }, []);
  return [data, loading, error];
}
function useLastSubgraphBlock(chainName = "optimism") {
  const [data, loading, error] = useGraph(`{
    _meta {
      block {
        number
      }
    } 
  }`, {
    chainName
  });
  const {
    0: block,
    1: setBlock
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!data) {
      return;
    }
    providers[chainName].getBlock(data._meta.block.number).then(block => {
      setBlock(block);
    });
  }, [data, setBlock]);
  return [block, loading, error];
}
function useTradersData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "optimism"
} = {}) {
  const [closedPositionsData, loading, error] = useGraph(`{
    tradingStats(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { period: "daily", timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      timestamp
      profit
      loss
      profitCumulative
      lossCumulative
      longOpenInterest
      shortOpenInterest
    }
  }`, {
    chainName
  });
  const [feesData] = useFeesData({
    from,
    to,
    chainName
  });
  const marginFeesByTs = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!feesData || !closedPositionsData || closedPositionsData && !closedPositionsData.tradingStats.length) {
      return {};
    }
    let feesCumulative = 0;
    return feesData.reduce((memo, {
      timestamp,
      margin: fees
    }) => {
      feesCumulative += fees;
      memo[timestamp] = {
        fees,
        feesCumulative
      };
      return memo;
    }, {});
  }, [feesData]);
  let ret = null;
  const data = closedPositionsData && closedPositionsData.tradingStats.length > 0 ? Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(closedPositionsData.tradingStats, i => i.timestamp).map(dataItem => {
    var _marginFeesByTs$dataI, _marginFeesByTs$dataI2;
    const longOpenInterest = dataItem.longOpenInterest / 1e30;
    const shortOpenInterest = dataItem.shortOpenInterest / 1e30;
    const openInterest = longOpenInterest + shortOpenInterest;
    const fees = ((_marginFeesByTs$dataI = marginFeesByTs[dataItem.timestamp]) === null || _marginFeesByTs$dataI === void 0 ? void 0 : _marginFeesByTs$dataI.fees) || 0;
    const feesCumulative = ((_marginFeesByTs$dataI2 = marginFeesByTs[dataItem.timestamp]) === null || _marginFeesByTs$dataI2 === void 0 ? void 0 : _marginFeesByTs$dataI2.feesCumulative) || 0;
    const profit = dataItem.profit / 1e30;
    const loss = dataItem.loss / 1e30;
    const profitCumulative = dataItem.profitCumulative / 1e30;
    const lossCumulative = dataItem.lossCumulative / 1e30;
    const pnlCumulative = profitCumulative - lossCumulative;
    const pnl = profit - loss;
    return {
      longOpenInterest,
      shortOpenInterest,
      openInterest,
      profit,
      loss: -loss,
      profitCumulative,
      lossCumulative: -lossCumulative,
      pnl,
      pnlCumulative,
      timestamp: dataItem.timestamp
    };
  }) : null;
  if (data) {
    const maxProfit = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["maxBy"])(data, item => item.profit).profit;
    const maxLoss = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["minBy"])(data, item => item.loss).loss;
    const maxProfitLoss = Math.max(maxProfit, -maxLoss);
    const maxPnl = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["maxBy"])(data, item => item.pnl).pnl;
    const minPnl = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["minBy"])(data, item => item.pnl).pnl;
    const maxCumulativePnl = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["maxBy"])(data, item => item.pnlCumulative).pnlCumulative;
    const minCumulativePnl = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["minBy"])(data, item => item.pnlCumulative).pnlCumulative;
    const profitCumulative = data[data.length - 1].profitCumulative;
    const lossCumulative = data[data.length - 1].lossCumulative;
    const stats = {
      maxProfit,
      maxLoss,
      maxProfitLoss,
      profitCumulative,
      lossCumulative,
      maxCumulativeProfitLoss: Math.max(profitCumulative, -lossCumulative),
      maxAbsOfPnlAndCumulativePnl: Math.max(Math.abs(maxPnl), Math.abs(maxCumulativePnl), Math.abs(minPnl), Math.abs(minCumulativePnl))
    };
    ret = {
      data,
      stats
    };
  }
  return [ret, loading];
}
function getSwapSourcesFragment(skip = 0, from, to) {
  return `
    hourlyVolumeBySources(
      first: 1000
      skip: ${skip}
      orderBy: timestamp
      orderDirection: desc
      where: { timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      timestamp
      source
      swap
    }
  `;
}
function useSwapSources({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "optimism"
} = {}) {
  const query = `{
    a: ${getSwapSourcesFragment(0, from, to)}
    b: ${getSwapSourcesFragment(1000, from, to)}
    c: ${getSwapSourcesFragment(2000, from, to)}
    d: ${getSwapSourcesFragment(3000, from, to)}
    e: ${getSwapSourcesFragment(4000, from, to)}
  }`;
  const [graphData, loading, error] = useGraph(query, {
    chainName
  });
  let total = 0;
  let data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!graphData) {
      return null;
    }
    const {
      a,
      b,
      c,
      d,
      e
    } = graphData;
    const all = [...a, ...b, ...c, ...d, ...e];
    const totalVolumeBySource = a.reduce((acc, item) => {
      const source = knownSwapSources[chainName][item.source] || item.source;
      if (!acc[source]) {
        acc[source] = 0;
      }
      acc[source] += item.swap / 1e30;
      return acc;
    }, {});
    const topVolumeSources = new Set(Object.entries(totalVolumeBySource).sort((a, b) => b[1] - a[1]).map(item => item[0]).slice(0, 30));
    let ret = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["chain"])(all).groupBy(item => parseInt(item.timestamp / 86400) * 86400).map((values, timestamp) => {
      let all = 0;
      const retItem = _objectSpread({
        timestamp: Number(timestamp)
      }, values.reduce((memo, item) => {
        let source = knownSwapSources[chainName][item.source] || item.source;
        if (!topVolumeSources.has(source)) {
          source = "Other";
        }
        if (item.swap != 0) {
          const volume = item.swap / 1e30;
          memo[source] = memo[source] || 0;
          memo[source] += volume;
          all += volume;
        }
        return memo;
      }, {}));
      retItem.all = all;
      return retItem;
    }).sortBy(item => item.timestamp).value();
    return ret;
  }, [graphData]);
  return [data, loading, error];
}
function getServerHostname(chainName) {
  return process.env.RAZZLE_MJAR_API_URL;
}
function useTotalVolumeFromServer() {
  const [data, loading] = useRequest(getServerHostname() + "/total_volume");
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!data) {
      return [data, loading];
    }
    const total = data.reduce((memo, item) => {
      return memo + parseInt(item.data.volume) / 1e30;
    }, 0);
    return [total, loading];
  }, [data, loading]);
}
async function getStatsFromSubgraph(graphClient, chainName = "optimism") {
  const queryString = `{
    totalVolumes: volumeStats(where: {period: "total"}) {
      swap
      mint
      burn
      margin
      liquidation
    }
    deltaVolumes: volumeStats(
      first:1
      orderBy: timestamp
      orderDirection: desc
      where: {period: "daily"}
    ) {
      swap
      mint
      burn
      margin
      liquidation
    }
  	totalFees: feeStats(where: {period: "total"}) {
      swap
      mint
      burn
      margin
      liquidation
		}
    deltaFees: feeStats(
      first:1
      orderBy: timestamp
      orderDirection: desc
      where: {period: "daily"}
    ) {
      swap
      mint
      burn
      margin
      liquidation
    }
  }`;
  const query = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_1__["gql"])(queryString);
  const {
    data
  } = await graphClient.query({
    query
  });
  const statsProps = ["totalVolumes", "deltaVolumes", "totalFees", "deltaFees"];
  const methodProps = ["swap", "mint", "burn", "margin", "liquidation"];
  const result = {};
  console.log(data);
  statsProps.forEach(statsProp => {
    result[statsProp] = {};
    let total = 0;
    methodProps.forEach(methodProp => {
      const statValue = parseInt(data[statsProp][0][methodProp]) / 1e30;
      console.log(statValue);
      result[statsProp][methodProp] = statValue;
      total += statValue;
    });
    result[statsProp].total = total;
  });
  console.log(result);
  return result;
}
function useVolumeDataFromServer({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "optimism"
} = {}) {
  const PROPS = "margin liquidation swap mint burn".split(" ");
  const [data, loading] = useRequest(`${getServerHostname(chainName)}/daily_volume`, null, async url => {
    let after;
    const ret = [];
    while (true) {
      const res = await (await cross_fetch__WEBPACK_IMPORTED_MODULE_3___default()(url + (after ? `?after=${after}` : ""))).json();
      if (res.length === 0) return ret;
      for (const item of res) {
        if (item.data.timestamp < from) {
          return ret;
        }
        ret.push(item);
      }
      after = res[res.length - 1].id;
    }
  });
  const ret = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!data) {
      return null;
    }
    const tmp = data.reduce((memo, item) => {
      const timestamp = item.data.timestamp;
      if (timestamp < from || timestamp > to) {
        return memo;
      }
      let type;
      if (item.data.action === "Swap") {
        type = "swap";
      } else if (item.data.action === "SellUSDM") {
        type = "burn";
      } else if (item.data.action === "BuyUSDM") {
        type = "mint";
      } else if (item.data.action.includes("LiquidatePosition")) {
        type = "liquidation";
      } else {
        type = "margin";
      }
      const volume = Number(item.data.volume) / 1e30;
      memo[timestamp] = memo[timestamp] || {};
      memo[timestamp][type] = memo[timestamp][type] || 0;
      memo[timestamp][type] += volume;
      return memo;
    }, {});
    let cumulative = 0;
    const cumulativeByTs = {};
    return Object.keys(tmp).sort().map(timestamp => {
      const item = tmp[timestamp];
      let all = 0;
      let movingAverageAll;
      const movingAverageTs = timestamp - MOVING_AVERAGE_PERIOD;
      if (movingAverageTs in cumulativeByTs) {
        movingAverageAll = (cumulative - cumulativeByTs[movingAverageTs]) / MOVING_AVERAGE_DAYS;
      }
      PROPS.forEach(prop => {
        if (item[prop]) all += item[prop];
      });
      cumulative += all;
      cumulativeByTs[timestamp] = cumulative;
      return _objectSpread({
        timestamp,
        all,
        cumulative,
        movingAverageAll
      }, item);
    });
  }, [data, from, to]);
  return [ret, loading];
}
function useUsersData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "optimism"
} = {}) {
  const query = `{
    userStats(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { period: "daily", timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      uniqueCount
      uniqueSwapCount
      uniqueMarginCount
      uniqueMintBurnCount
      uniqueCountCumulative
      uniqueSwapCountCumulative
      uniqueMarginCountCumulative
      uniqueMintBurnCountCumulative
      actionCount
      actionSwapCount
      actionMarginCount
      actionMintBurnCount
      timestamp
    }
  }`;
  const [graphData, loading, error] = useGraph(query, {
    chainName
  });
  const prevUniqueCountCumulative = {};
  const data = graphData ? Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(graphData.userStats, "timestamp").map(item => {
    const newCountData = ["", "Swap", "Margin", "MintBurn"].reduce((memo, type) => {
      memo[`new${type}Count`] = prevUniqueCountCumulative[type] ? item[`unique${type}CountCumulative`] - prevUniqueCountCumulative[type] : item[`unique${type}Count`];
      prevUniqueCountCumulative[type] = item[`unique${type}CountCumulative`];
      return memo;
    }, {});
    const oldCount = item.uniqueCount - newCountData.newCount;
    const oldPercent = (oldCount / item.uniqueCount * 100).toFixed(1);
    return _objectSpread(_objectSpread({
      all: item.uniqueCount,
      uniqueSum: item.uniqueSwapCount + item.uniqueMarginCount + item.uniqueMintBurnCount,
      oldCount,
      oldPercent
    }, newCountData), item);
  }) : null;
  return [data, loading, error];
}
function useFundingRateData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "optimism"
} = {}) {
  const query = `{
    fundingRates(
      first: 1000,
      orderBy: timestamp,
      orderDirection: desc,
      where: { period: "daily", id_gte: ${from}, id_lte: ${to} }
    ) {
      id,
      token,
      timestamp,
      startFundingRate,
      startTimestamp,
      endFundingRate,
      endTimestamp
    }
  }`;
  const [graphData, loading, error] = useGraph(query, {
    chainName
  });
  const data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!graphData) {
      return null;
    }
    const groups = graphData.fundingRates.reduce((memo, item) => {
      const symbol = tokenSymbols[item.token];
      memo[item.timestamp] = memo[item.timestamp] || {
        timestamp: item.timestamp
      };
      const group = memo[item.timestamp];
      const timeDelta = parseInt((item.endTimestamp - item.startTimestamp) / 3600) * 3600;
      let fundingRate = 0;
      if (item.endFundingRate && item.startFundingRate) {
        const fundingDelta = item.endFundingRate - item.startFundingRate;
        const divisor = timeDelta / 86400;
        fundingRate = fundingDelta / divisor / 10000 * 365;
      }
      group[symbol] = fundingRate;
      return memo;
    }, {});
    return fillNa(Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(Object.values(groups), "timestamp"), ["OP", "ETH", "USDC", "USDT", "BTC", "DAI"]);
  }, [graphData]);
  return [data, loading, error];
}
const MOVING_AVERAGE_DAYS = 7;
const MOVING_AVERAGE_PERIOD = 86400 * MOVING_AVERAGE_DAYS;
function useVolumeData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "optimism"
} = {}) {
  const PROPS = "margin liquidation swap mint burn".split(" ");
  const timestampProp = "timestamp";
  const query = `{
    volumeStats(
      first: 1000,
      orderBy: timestamp,
      orderDirection: desc
      where: { period: daily, timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      timestamp
      ${PROPS.join("\n")}
    }
  }`;
  const [graphData, loading, error] = useGraph(query, {
    chainName
  });
  const data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!graphData) {
      return null;
    }
    let ret = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(graphData.volumeStats, timestampProp).map(item => {
      const ret = {
        timestamp: item[timestampProp]
      };
      let all = 0;
      PROPS.forEach(prop => {
        ret[prop] = item[prop] / 1e30;
        all += ret[prop];
      });
      ret.all = all;
      return ret;
    });
    let cumulative = 0;
    const cumulativeByTs = {};
    return ret.map(item => {
      cumulative += item.all;
      let movingAverageAll;
      const movingAverageTs = item.timestamp - MOVING_AVERAGE_PERIOD;
      if (movingAverageTs in cumulativeByTs) {
        movingAverageAll = (cumulative - cumulativeByTs[movingAverageTs]) / MOVING_AVERAGE_DAYS;
      }
      return _objectSpread({
        movingAverageAll,
        cumulative
      }, item);
    });
  }, [graphData]);
  let total;
  if (data && data.length) total = data[data.length - 1].cumulative;
  return [data, total, loading, error];
}
function useFeesData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "optimism"
} = {}) {
  const PROPS = "margin liquidation swap mint burn".split(" ");
  const feesQuery = `{
    feeStats(
      first: 1000
      orderBy: id
      orderDirection: desc
      where: { period: daily, timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      id
      margin
      marginAndLiquidation
      swap
      mint
      burn
      timestamp
    }
  }`;
  let [feesData, loading, error] = useGraph(feesQuery, {
    chainName
  });
  const feesChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!feesData || feesData && feesData.feeStats.length === 0) {
      return null;
    }
    let chartData = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(feesData.feeStats, "id").map(item => {
      const ret = {
        timestamp: item.timestamp || item.id
      };
      PROPS.forEach(prop => {
        if (item[prop]) {
          ret[prop] = item[prop] / 1e30;
        }
      });
      ret.liquidation = item.marginAndLiquidation / 1e30 - item.margin / 1e30;
      ret.all = PROPS.reduce((memo, prop) => memo + ret[prop], 0);
      return ret;
    });
    let cumulative = 0;
    const cumulativeByTs = {};
    return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["chain"])(chartData).groupBy(item => item.timestamp).map((values, timestamp) => {
      const all = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sumBy"])(values, "all");
      cumulative += all;
      let movingAverageAll;
      const movingAverageTs = timestamp - MOVING_AVERAGE_PERIOD;
      if (movingAverageTs in cumulativeByTs) {
        movingAverageAll = (cumulative - cumulativeByTs[movingAverageTs]) / MOVING_AVERAGE_DAYS;
      }
      const ret = {
        timestamp: Number(timestamp),
        all,
        cumulative,
        movingAverageAll
      };
      PROPS.forEach(prop => {
        ret[prop] = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sumBy"])(values, prop);
      });
      cumulativeByTs[timestamp] = cumulative;
      return ret;
    }).value().filter(item => item.timestamp >= from);
  }, [feesData]);
  return [feesChartData, loading, error];
}
function useAumPerformanceData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  groupPeriod
}) {
  const [feesData, feesLoading] = useFeesData({
    from,
    to,
    groupPeriod
  });
  const [mjlpData, mjlpLoading] = useMjlpData({
    from,
    to,
    groupPeriod
  });
  const [volumeData, volumeLoading] = useVolumeData({
    from,
    to,
    groupPeriod
  });
  const dailyCoef = 86400 / groupPeriod;
  const data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!feesData || !mjlpData || !volumeData) {
      return null;
    }
    const ret = feesData.map((feeItem, i) => {
      const mjlpItem = mjlpData[i];
      const volumeItem = volumeData[i];
      let apr = feeItem !== null && feeItem !== void 0 && feeItem.all && mjlpItem !== null && mjlpItem !== void 0 && mjlpItem.aum ? feeItem.all / mjlpItem.aum * 100 * 365 * dailyCoef : null;
      if (apr > 10000) {
        apr = null;
      }
      let usage = volumeItem !== null && volumeItem !== void 0 && volumeItem.all && mjlpItem !== null && mjlpItem !== void 0 && mjlpItem.aum ? volumeItem.all / mjlpItem.aum * 100 * dailyCoef : null;
      if (usage > 10000) {
        usage = null;
      }
      return {
        timestamp: feeItem.timestamp,
        apr,
        usage
      };
    });
    const averageApr = ret.reduce((memo, item) => item.apr + memo, 0) / ret.length;
    ret.forEach(item => item.averageApr = averageApr);
    const averageUsage = ret.reduce((memo, item) => item.usage + memo, 0) / ret.length;
    ret.forEach(item => item.averageUsage = averageUsage);
    return ret;
  }, [feesData, mjlpData, volumeData]);
  return [data, feesLoading || mjlpLoading || volumeLoading];
}
function useMjlpData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "optimism"
} = {}) {
  const query = `{
    mjlpStats(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: {period: daily, timestamp_gte: ${from}, timestamp_lte: ${to}}
    ) {
      timestamp
      aumInUsdm
      mjlpSupply
      distributedUsd
      distributedEth
    }
  }`;
  let [data, loading, error] = useGraph(query, {
    chainName
  });
  let cumulativeDistributedUsdPerMjlp = 0;
  let cumulativeDistributedEthPerMjlp = 0;
  const mjlpChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!data || data && data.mjlpStats.length === 0) {
      return null;
    }
    const getTimestamp = item => item.timestamp;
    let prevMjlpSupply;
    let prevAum;
    let ret = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(data.mjlpStats, item => item.timestamp).filter(item => item.timestamp % 86400 === 0).reduce((memo, item) => {
      const last = memo[memo.length - 1];
      const aum = Number(item.aumInUsdm) / 1e18;
      const mjlpSupply = Number(item.mjlpSupply) / 1e18;
      const distributedUsd = Number(item.distributedUsd) / 1e30;
      const distributedUsdPerMjlp = distributedUsd / mjlpSupply || 0;
      cumulativeDistributedUsdPerMjlp += distributedUsdPerMjlp;
      const distributedEth = Number(item.distributedEth) / 1e18;
      const distributedEthPerMjlp = distributedEth / mjlpSupply || 0;
      cumulativeDistributedEthPerMjlp += distributedEthPerMjlp;
      const mjlpPrice = aum / mjlpSupply;
      const timestamp = parseInt(item.timestamp);
      const newItem = {
        timestamp,
        aum,
        mjlpSupply,
        mjlpPrice,
        cumulativeDistributedEthPerMjlp,
        cumulativeDistributedUsdPerMjlp,
        distributedUsdPerMjlp,
        distributedEthPerMjlp
      };
      if (last && last.timestamp === timestamp) {
        memo[memo.length - 1] = newItem;
      } else {
        memo.push(newItem);
      }
      return memo;
    }, []).map(item => {
      let {
        mjlpSupply,
        aum
      } = item;
      if (!mjlpSupply) {
        mjlpSupply = prevMjlpSupply;
      }
      if (!aum) {
        aum = prevAum;
      }
      item.mjlpSupplyChange = prevMjlpSupply ? (mjlpSupply - prevMjlpSupply) / prevMjlpSupply * 100 : 0;
      if (item.mjlpSupplyChange > 1000) item.mjlpSupplyChange = 0;
      item.aumChange = prevAum ? (aum - prevAum) / prevAum * 100 : 0;
      if (item.aumChange > 1000) item.aumChange = 0;
      prevMjlpSupply = mjlpSupply;
      prevAum = aum;
      return item;
    });
    ret = fillNa(ret);
    return ret;
  }, [data]);
  return [mjlpChartData, loading, error];
}
function useMjlpPerformanceData(mjlpData, feesData, {
  from = FIRST_DATE_TS,
  chainName = "optimism"
} = {}) {
  const [btcPrices] = useCoingeckoPrices("BTC", {
    from
  });
  const [ethPrices] = useCoingeckoPrices("ETH", {
    from
  });
  const [maticPrices] = useCoingeckoPrices("OP", {
    from
  });
  const mjlpPerformanceChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _mjlpDataById$btcPric, _btcPrices$, _ethPrices$;
    if (!btcPrices || !ethPrices || !mjlpData || !feesData) {
      return null;
    }
    const mjlpDataById = mjlpData.reduce((memo, item) => {
      memo[item.timestamp] = item;
      return memo;
    }, {});
    const feesDataById = feesData.reduce((memo, item) => {
      memo[item.timestamp] = item;
      return memo;
    });
    let BTC_WEIGHT = 0.15;
    let ETH_WEIGHT = 0.2;
    let OP_WEIGHT = 0.1;
    let prevEthPrice = 1200;
    let prevMaticPrice = 0.4;
    const STABLE_WEIGHT = 0.5;
    const MJLP_START_PRICE = ((_mjlpDataById$btcPric = mjlpDataById[btcPrices[0].timestamp]) === null || _mjlpDataById$btcPric === void 0 ? void 0 : _mjlpDataById$btcPric.mjlpPrice) || 1.19;
    const btcFirstPrice = (_btcPrices$ = btcPrices[0]) === null || _btcPrices$ === void 0 ? void 0 : _btcPrices$.value;
    const ethFirstPrice = (_ethPrices$ = ethPrices[0]) === null || _ethPrices$ === void 0 ? void 0 : _ethPrices$.value;
    const maticFirstPrice = maticPrices && maticPrices[0] && maticPrices[0].value || prevMaticPrice;
    const indexBtcCount = MJLP_START_PRICE * BTC_WEIGHT / btcFirstPrice;
    const indexEthCount = MJLP_START_PRICE * ETH_WEIGHT / ethFirstPrice;
    const indexMaticCount = MJLP_START_PRICE * OP_WEIGHT / maticFirstPrice;
    const lpBtcCount = MJLP_START_PRICE * 0.5 / btcFirstPrice;
    const lpEthCount = MJLP_START_PRICE * 0.5 / ethFirstPrice;
    const lpMaticCount = MJLP_START_PRICE * 0.5 / maticFirstPrice;
    const ret = [];
    let cumulativeFeesPerMjlp = 0;
    let cumulativeEsmjarRewardsPerMjlp = 0;
    let lastMjlpPrice = 0;
    for (let i = 0; i < btcPrices.length; i++) {
      var _ethPrices$i, _mjlpItem$mjlpPrice, _mjlpDataById$timesta, _feesDataById$timesta;
      const btcPrice = btcPrices[i].value;
      const ethPrice = ((_ethPrices$i = ethPrices[i]) === null || _ethPrices$i === void 0 ? void 0 : _ethPrices$i.value) || prevEthPrice;
      const maticPrice = maticPrices && maticPrices[i] && maticPrices[i].value || prevMaticPrice;
      prevMaticPrice = maticPrice;
      prevEthPrice = ethPrice;
      const timestampGroup = parseInt(btcPrices[i].timestamp / 86400) * 86400;
      const mjlpItem = mjlpDataById[timestampGroup];
      const mjlpPrice = (_mjlpItem$mjlpPrice = mjlpItem === null || mjlpItem === void 0 ? void 0 : mjlpItem.mjlpPrice) !== null && _mjlpItem$mjlpPrice !== void 0 ? _mjlpItem$mjlpPrice : lastMjlpPrice;
      lastMjlpPrice = mjlpPrice;
      const mjlpSupply = (_mjlpDataById$timesta = mjlpDataById[timestampGroup]) === null || _mjlpDataById$timesta === void 0 ? void 0 : _mjlpDataById$timesta.mjlpSupply;
      const dailyFees = (_feesDataById$timesta = feesDataById[timestampGroup]) === null || _feesDataById$timesta === void 0 ? void 0 : _feesDataById$timesta.all;
      const syntheticPrice = indexBtcCount * btcPrice + indexEthCount * ethPrice + indexMaticCount * maticPrice + MJLP_START_PRICE * STABLE_WEIGHT;
      const lpBtcPrice = (lpBtcCount * btcPrice + MJLP_START_PRICE / 2) * (1 + getImpermanentLoss(btcPrice / btcFirstPrice));
      const lpEthPrice = (lpEthCount * ethPrice + MJLP_START_PRICE / 2) * (1 + getImpermanentLoss(ethPrice / ethFirstPrice));
      const lpMaticPrice = (lpMaticCount * maticPrice + MJLP_START_PRICE / 2) * (1 + getImpermanentLoss(maticPrice / maticFirstPrice));
      if (dailyFees && mjlpSupply) {
        const INCREASED_MJLP_REWARDS_TIMESTAMP = 1635714000;
        const MJLP_REWARDS_SHARE = timestampGroup >= INCREASED_MJLP_REWARDS_TIMESTAMP ? 0.7 : 0.5;
        const collectedFeesPerMjlp = dailyFees / mjlpSupply * MJLP_REWARDS_SHARE;
        cumulativeFeesPerMjlp += collectedFeesPerMjlp;
        cumulativeEsmjarRewardsPerMjlp += mjlpPrice * 0.8 / 365;
      }
      let mjlpPlusFees = mjlpPrice;
      if (mjlpPrice && mjlpSupply && cumulativeFeesPerMjlp) {
        mjlpPlusFees = mjlpPrice + cumulativeFeesPerMjlp;
      }
      let mjlpApr;
      let mjlpPlusDistributedUsd;
      let mjlpPlusDistributedEth;
      if (mjlpItem) {
        if (mjlpItem.cumulativeDistributedUsdPerMjlp) {
          mjlpPlusDistributedUsd = mjlpPrice + mjlpItem.cumulativeDistributedUsdPerMjlp;
          // mjlpApr = mjlpItem.distributedUsdPerMjlp / mjlpPrice * 365 * 100 // incorrect?
        }

        if (mjlpItem.cumulativeDistributedEthPerMjlp) {
          mjlpPlusDistributedEth = mjlpPrice + mjlpItem.cumulativeDistributedEthPerMjlp * ethPrice;
        }
      }
      ret.push({
        timestamp: btcPrices[i].timestamp,
        syntheticPrice,
        lpBtcPrice,
        lpEthPrice,
        lpMaticPrice,
        mjlpPrice,
        btcPrice,
        ethPrice,
        mjlpPlusFees,
        mjlpPlusDistributedUsd,
        mjlpPlusDistributedEth,
        performanceLpEth: (mjlpPrice / lpEthPrice * 100).toFixed(1),
        performanceLpEthCollectedFees: (mjlpPlusFees / lpEthPrice * 100).toFixed(1),
        performanceLpEthDistributedUsd: (mjlpPlusDistributedUsd / lpEthPrice * 100).toFixed(1),
        performanceLpEthDistributedEth: (mjlpPlusDistributedEth / lpEthPrice * 100).toFixed(1),
        performanceLpBtcCollectedFees: (mjlpPlusFees / lpBtcPrice * 100).toFixed(1),
        performanceSynthetic: (mjlpPrice / syntheticPrice * 100).toFixed(1),
        performanceSyntheticCollectedFees: (mjlpPlusFees / syntheticPrice * 100).toFixed(1),
        performanceSyntheticDistributedUsd: (mjlpPlusDistributedUsd / syntheticPrice * 100).toFixed(1),
        performanceSyntheticDistributedEth: (mjlpPlusDistributedEth / syntheticPrice * 100).toFixed(1),
        mjlpApr
      });
    }
    return ret;
  }, [btcPrices, ethPrices, mjlpData, feesData]);
  return [mjlpPerformanceChartData];
}
function useReferralsData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "optimism"
} = {}) {
  const query = `{
    globalStats(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { period: "daily", timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      volume
      volumeCumulative
      totalRebateUsd
      totalRebateUsdCumulative
      discountUsd
      discountUsdCumulative
      referrersCount
      referrersCountCumulative
      referralCodesCount
      referralCodesCountCumulative
      referralsCount
      referralsCountCumulative
      timestamp
    }
  }`;
  const subgraph = process.env.RAZZLE_REFERRAL_SUBGRAPH_URL;
  const [graphData, loading, error] = useGraph(query, {
    subgraph
  });
  const data = graphData ? Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(graphData.globalStats, "timestamp").map(item => {
    const totalRebateUsd = item.totalRebateUsd / 1e30;
    const discountUsd = item.discountUsd / 1e30;
    return _objectSpread(_objectSpread({}, item), {}, {
      volume: item.volume / 1e30,
      volumeCumulative: item.volumeCumulative / 1e30,
      totalRebateUsd,
      totalRebateUsdCumulative: item.totalRebateUsdCumulative / 1e30,
      discountUsd,
      referrerRebateUsd: totalRebateUsd - discountUsd,
      discountUsdCumulative: item.discountUsdCumulative / 1e30,
      referralCodesCount: parseInt(item.referralCodesCount),
      referralCodesCountCumulative: parseInt(item.referralCodesCountCumulative),
      referrersCount: parseInt(item.referrersCount),
      referrersCountCumulative: parseInt(item.referrersCountCumulative),
      referralsCount: parseInt(item.referralsCount),
      referralsCountCumulative: parseInt(item.referralsCountCumulative)
    });
  }) : null;
  return [data, loading, error];
}

/***/ }),

/***/ "./src/fonts/comfortaa/Comfortaa-Bold.ttf":
/*!************************************************!*\
  !*** ./src/fonts/comfortaa/Comfortaa-Bold.ttf ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Comfortaa-Bold.2df2dd0e.ttf";

/***/ }),

/***/ "./src/fonts/comfortaa/Comfortaa-Light.ttf":
/*!*************************************************!*\
  !*** ./src/fonts/comfortaa/Comfortaa-Light.ttf ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Comfortaa-Light.a32b6e45.ttf";

/***/ }),

/***/ "./src/fonts/comfortaa/Comfortaa-Medium.ttf":
/*!**************************************************!*\
  !*** ./src/fonts/comfortaa/Comfortaa-Medium.ttf ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Comfortaa-Medium.cca5f204.ttf";

/***/ }),

/***/ "./src/fonts/comfortaa/Comfortaa-Regular.ttf":
/*!***************************************************!*\
  !*** ./src/fonts/comfortaa/Comfortaa-Regular.ttf ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Comfortaa-Regular.26795cfa.ttf";

/***/ }),

/***/ "./src/fonts/comfortaa/Comfortaa-SemiBold.ttf":
/*!****************************************************!*\
  !*** ./src/fonts/comfortaa/Comfortaa-SemiBold.ttf ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Comfortaa-SemiBold.170d22d9.ttf";

/***/ }),

/***/ "./src/fonts/philosopher/Philosopher-Bold.ttf":
/*!****************************************************!*\
  !*** ./src/fonts/philosopher/Philosopher-Bold.ttf ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Philosopher-Bold.a3aed8ba.ttf";

/***/ }),

/***/ "./src/fonts/philosopher/Philosopher-BoldItalic.ttf":
/*!**********************************************************!*\
  !*** ./src/fonts/philosopher/Philosopher-BoldItalic.ttf ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Philosopher-BoldItalic.fa16e091.ttf";

/***/ }),

/***/ "./src/fonts/philosopher/Philosopher-Italic.ttf":
/*!******************************************************!*\
  !*** ./src/fonts/philosopher/Philosopher-Italic.ttf ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Philosopher-Italic.b9e3037c.ttf";

/***/ }),

/***/ "./src/fonts/philosopher/Philosopher-Regular.ttf":
/*!*******************************************************!*\
  !*** ./src/fonts/philosopher/Philosopher-Regular.ttf ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Philosopher-Regular.af6ea627.ttf";

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: CHART_HEIGHT, YAXIS_WIDTH, GREEN, RED, COLORS, COINCOLORS, getLogger, fillPeriods, formatNumber, compactNumber, tooltipLabelFormatter, yaxisFormatterPercent, yaxisFormatterNumber, yaxisFormatter, tooltipFormatterNumber, tooltipFormatterPercent, tooltipFormatter, tooltipLabelFormatterUnits, tsToIso, tsToIsoDate, urlWithParams, getProvider, findNearest, queryProviderLogs, LogRecord, UsdmSupplyRecord */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHART_HEIGHT", function() { return CHART_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YAXIS_WIDTH", function() { return YAXIS_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GREEN", function() { return GREEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RED", function() { return RED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLORS", function() { return COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COINCOLORS", function() { return COINCOLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLogger", function() { return getLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillPeriods", function() { return fillPeriods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatNumber", function() { return formatNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compactNumber", function() { return compactNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tooltipLabelFormatter", function() { return tooltipLabelFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yaxisFormatterPercent", function() { return yaxisFormatterPercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yaxisFormatterNumber", function() { return yaxisFormatterNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yaxisFormatter", function() { return yaxisFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tooltipFormatterNumber", function() { return tooltipFormatterNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tooltipFormatterPercent", function() { return tooltipFormatterPercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tooltipFormatter", function() { return tooltipFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tooltipLabelFormatterUnits", function() { return tooltipLabelFormatterUnits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsToIso", function() { return tsToIso; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsToIsoDate", function() { return tsToIsoDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlWithParams", function() { return urlWithParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProvider", function() { return getProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNearest", function() { return findNearest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryProviderLogs", function() { return queryProviderLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogRecord", function() { return LogRecord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsdmSupplyRecord", function() { return UsdmSupplyRecord; });
/* harmony import */ var console_log_level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! console-log-level */ "console-log-level");
/* harmony import */ var console_log_level__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(console_log_level__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var strftime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! strftime */ "strftime");
/* harmony import */ var strftime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(strftime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_3__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




const {
  BigNumber
} = ethers__WEBPACK_IMPORTED_MODULE_1__["ethers"];
const CHART_HEIGHT = 400;
const YAXIS_WIDTH = 65;
const GREEN = '#22c761';
const RED = '#f93333';
const COLORS = ['#ee64b8', GREEN, '#ff8d00', '#00bfea', '#8884ff', '#ab6100', '#c90000', '#7b7b7b', '#6464ff', 'purple', 'darkgreen', RED];
const COINCOLORS = ['#627EEA', '#FF9800', '#FF007A', '#2A5ADA', '#2775CA', '#26A17B', '#9895F3', '#8C8C8C', '#F4B731', 'purple', 'darkgreen', RED, '#F0B90B', '#FE88B1'];
const levelColor = {
  'debug': 'grey',
  'error': 'red',
  'warn': 'orange',
  'info': 'greenBright'
};
function getLogger(ns) {
  return console_log_level__WEBPACK_IMPORTED_MODULE_0___default()({
    level: false ? undefined : 'debug',
    prefix: level => {
      const prefix = `[${ns}] ${level.toUpperCase()}`;
      return (chalk__WEBPACK_IMPORTED_MODULE_3___default.a[levelColor[level]] || chalk__WEBPACK_IMPORTED_MODULE_3___default.a.white)(prefix);
    }
  });
}
const logger = getLogger('helpers');
const numberFmt0 = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
const numberFmt1 = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1
});
const numberFmt2 = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});
const currencyFmt0 = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
const currencyFmt1 = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1
});
const currencyFmt2 = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});
function fillPeriods(arr, {
  period,
  from,
  to,
  interpolate = true,
  extrapolate = false
}) {
  let i = 0;
  let prevTimestamp = from ? from - period : arr[0].timestamp;
  let prevPeriodStep = Math.floor(prevTimestamp / period);
  let prevItem;
  const ret = [];
  while (i < arr.length) {
    const item = arr[i];
    const periodStep = Math.floor(item.timestamp / period);
    if (periodStep - 1 > prevPeriodStep) {
      const diff = periodStep - prevPeriodStep;
      let j = 1;
      while (j < diff) {
        let newItem = {
          timestamp: (prevPeriodStep + j) * period
        };
        if (interpolate) {
          newItem = _objectSpread(_objectSpread({}, prevItem), newItem);
        }
        ret.push(newItem);
        j++;
      }
    }
    ret.push(item);
    if (to && i === arr.length - 1) {
      const lastPeriodStep = Math.floor(to / period);
      if (lastPeriodStep > periodStep) {
        const diff = lastPeriodStep - periodStep;
        let j = 0;
        while (j < diff) {
          let newItem = {
            timestamp: (periodStep + j + 1) * period
          };
          if (extrapolate) {
            newItem = _objectSpread(_objectSpread({}, item), newItem);
          }
          ret.push(newItem);
          j++;
        }
      }
    }
    prevItem = item;
    prevPeriodStep = periodStep;
    i++;
  }
  return ret;
}
function _getNumberFmt(value) {
  const absValue = Math.abs(value);
  if (absValue < 10) {
    return numberFmt2;
  } else if (absValue < 1000) {
    return numberFmt1;
  } else {
    return numberFmt0;
  }
}
function _getCurrencyFmt(value) {
  const absValue = Math.abs(value);
  if (absValue < 10) {
    return currencyFmt2;
  } else if (absValue < 1000) {
    return currencyFmt1;
  } else {
    return currencyFmt0;
  }
}
const formatNumber = (value, opts = {}) => {
  const currency = !!opts.currency;
  const compact = !!opts.compact;
  if (currency && !compact) {
    return _getCurrencyFmt(value).format(value);
  }
  const display = compact ? compactNumber(value) : _getNumberFmt(value).format(value);
  if (currency) {
    return `$${display}`;
  }
  return display;
};
const compactNumber = value => {
  const abs = Math.abs(value);
  if (abs >= 1e9) {
    return `${(value / 1e9).toFixed(abs < 1e10 ? 2 : 1)}B`;
  }
  if (abs >= 1e6) {
    return `${(value / 1e6).toFixed(abs < 1e7 ? 2 : 1)}M`;
  }
  if (abs >= 1e3) {
    return `${(value / 1e3).toFixed(abs < 1e4 ? 2 : 1)}K`;
  }
  return `${value.toFixed(1)}`;
};
const tooltipLabelFormatter = (label, args) => {
  if (!label) {
    return;
  }
  if (label.constructor !== Date) {
    label = new Date(label * 1000);
  }
  const item = args && args[0] && args[0].payload && args[0];
  const dateFmtString = '%d.%m';
  const date = strftime__WEBPACK_IMPORTED_MODULE_2___default()(dateFmtString, label);
  const all = item && item.payload.all;
  if (all) {
    if (item && item.unit === '%') {
      return date;
    }
    return `${date}, ${formatNumber(all, {
      currency: true,
      compact: true
    })}`;
  }
  return date;
};
const yaxisFormatterPercent = value => {
  return value.toFixed(2) + '%';
};
const yaxisFormatterNumber = value => {
  return compactNumber(value);
};
const yaxisFormatter = (value, ...args) => {
  return formatNumber(value, {
    currency: true,
    compact: true
  });
};
const tooltipFormatterNumber = (value, name, item) => {
  return formatNumber(value);
};
const tooltipFormatterPercent = (value, name, item) => {
  return value.toFixed(2) + '%';
};
const tooltipFormatter = (value, name, item) => {
  if (item && item.unit === '%') {
    return value.toFixed(2);
  }
  return formatNumber(value, {
    currency: true
  });
};
const tooltipLabelFormatterUnits = (label, args) => {
  if (!label) {
    return label;
  }
  if (label.constructor !== Date) {
    label = new Date(label * 1000);
    if (!label.getDate()) {
      return label;
    }
  }
  const date = strftime__WEBPACK_IMPORTED_MODULE_2___default()('%d.%m', label);
  const item = args && args[0];
  if (item && item.unit === '%') {
    return date;
  }
  const all = item && item.payload.all;
  if (label.constructor !== Date) {
    return all ? `${label}, total: ${all}` : label;
  }
  return all ? `${date}, total: ${all}` : date;
};
function tsToIso(ts) {
  return new Date(ts - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -5);
}
function tsToIsoDate(ts) {
  return new Date(ts - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
function urlWithParams(url, params) {
  const paramsStr = Object.entries(params).reduce((memo, [key, value]) => {
    if (value) memo.push(`${key}=${encodeURIComponent(value)}`);
    return memo;
  }, []).join('&');
  return `${url}?${paramsStr}`;
}
function getProvider(chainId) {
  return new ethers__WEBPACK_IMPORTED_MODULE_1__["ethers"].providers.JsonRpcProvider("https://rpc.ankr.com/optimism", chainId);
}
function findNearest(arr, needle, getter = el => el) {
  let prevEl;
  for (const el of arr) {
    if (getter(el) > needle) {
      if (prevEl && getter(el) - needle > needle - getter(prevEl)) {
        return prevEl;
      } else {
        return el;
      }
    }
    prevEl = el;
  }
  return prevEl;
}
async function callWithRetry(func, args, maxTries = 10) {
  let i = 0;
  while (true) {
    try {
      return await func(...args);
    } catch (ex) {
      i++;
      if (i == maxTries) {
        throw ex;
      }
    }
  }
}
async function queryProviderLogs({
  fromBlock,
  toBlock,
  address,
  backwards
}) {
  logger.info(`query logs fromBlock=%s toBlock=%s blocks length=%s backwards=%s`, fromBlock, toBlock, toBlock - fromBlock, backwards);
  const allResult = [];
  const MAX = 1000;
  let chunkFromBlock;
  let chunkToBlock;
  if (backwards) {
    chunkToBlock = toBlock;
    chunkFromBlock = Math.max(fromBlock, toBlock - MAX);
  } else {
    chunkFromBlock = fromBlock;
    chunkToBlock = Math.min(toBlock, fromBlock + MAX);
  }
  let i = 0;
  while (true) {
    logger.info(`requesting ${i} chunk ${chunkFromBlock}-${chunkToBlock}...`);
    let result = await callWithRetry(provider.getLogs.bind(provider), [{
      fromBlock: chunkFromBlock,
      toBlock: chunkToBlock,
      address
    }]);
    if (backwards) {
      result = result.reverse();
    }
    allResult.push(...result);
    i++;
    if (!backwards && chunkToBlock === toBlock) {
      logger.info('done');
      break;
    }
    if (backwards && chunkFromBlock === fromBlock) {
      logger.info('done');
      break;
    }
    if (backwards) {
      chunkToBlock = chunkFromBlock - 1;
      chunkFromBlock = Math.max(fromBlock, chunkFromBlock - MAX);
    } else {
      chunkFromBlock = chunkToBlock + 1;
      chunkToBlock = Math.min(toBlock, chunkToBlock + MAX);
    }
  }
  return allResult;
}
function LogRecord(row) {
  return _objectSpread(_objectSpread({}, row), {}, {
    args: JSON.parse(row.args).map(el => {
      if (el && el.type === 'BigNumber') {
        return BigNumber.from(el.hex);
      }
      return el;
    })
  });
}
function UsdmSupplyRecord(row) {
  return _objectSpread(_objectSpread({}, row), {}, {
    supply: BigNumber.from(JSON.parse(row.supply).hex)
  });
}

/***/ }),

/***/ "./src/img/anzor-logo.png":
/*!********************************!*\
  !*** ./src/img/anzor-logo.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/anzor-logo.078fe1a9.png";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);

let app = __webpack_require__(/*! ./server */ "./src/server.js").default;
if (true) {
  module.hot.accept(/*! ./server */ "./src/server.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function () {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = __webpack_require__(/*! ./server */ "./src/server.js").default;
    } catch (error) {
      console.error(error);
    }
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));
  console.info('✅  Server-side HMR Enabled!');
}
const port = "3000" || false;
function cb(err, port) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`> Started server on port ${port}`);
}
http__WEBPACK_IMPORTED_MODULE_0__["createServer"](app).listen(port, err => cb(err, port));

/***/ }),

/***/ "./src/middlewares.js":
/*!****************************!*\
  !*** ./src/middlewares.js ***!
  \****************************/
/*! exports provided: requestLogger, csp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestLogger", function() { return requestLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csp", function() { return csp; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");

const logger = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getLogger"])("app");
const IS_PRODUCTION = false;
function _logRequest(req, res) {
  const time = Date.now() - req.start;
  const method = res.statusCode < 400 ? "info" : "warn";
  logger[method]("request %s %s handled statusCode: %s in time: %sms referer: %s ip: %s", req.method, req.originalUrl, res.statusCode, time, req.get("referer"), req.ip);
}
function requestLogger(req, res, next) {
  req.start = Date.now();
  res.on("close", evt => {
    _logRequest(req, res);
  });
  next();
}
function csp(req, res, next) {
  const csp = {
    "default-src": ["'self'"],
    "style-src": ["'self'"],
    "connect-src": ["https://api.thegraph.com", "https://api.coingecko.com", "https://stats.masonjar.finance/api", "https://masonjar.finance", "masonjar.finance"]
  };
  if (!IS_PRODUCTION) {
    csp["default-src"].push("localhost:3114");
    csp["style-src"].push("'unsafe-inline'");
    csp["connect-src"].push("localhost:3114", "ws://localhost:3114");
  }
  const cspString = Object.entries(csp).map(([key, value]) => `${key} ${value.join(' ')}`).join('; ');
  res.set("Content-Security-Policy", cspString);
  next();
}

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return routes; });
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cross-fetch */ "cross-fetch");
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cross_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var object_sizeof__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! object-sizeof */ "object-sizeof");
/* harmony import */ var object_sizeof__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(object_sizeof__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");
/* harmony import */ var _addresses__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addresses */ "./src/addresses.js");
/* harmony import */ var _dataProvider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dataProvider */ "./src/dataProvider.js");
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\routes.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;











const IS_PRODUCTION = false;
const assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");
const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css ? assets[entrypoint].css.map(asset => `<link rel="stylesheet" href="${asset}">`).join('') : '' : '';
};
const jsScriptTagsFromAssets = (assets, entrypoint, extra = '') => {
  return assets[entrypoint] ? assets[entrypoint].js ? assets[entrypoint].js.map(asset => `<script src="${asset}"${extra}></script>`).join('') : '' : '';
};
const {
  formatUnits
} = ethers__WEBPACK_IMPORTED_MODULE_0__["ethers"].utils;
const logger = Object(_helpers__WEBPACK_IMPORTED_MODULE_8__["getLogger"])('routes');
const apolloOptions = {
  query: {
    fetchPolicy: 'no-cache'
  },
  watchQuery: {
    fetchPolicy: 'no-cache'
  }
};
const optimismGraphClient = new _apollo_client__WEBPACK_IMPORTED_MODULE_7__["ApolloClient"]({
  link: new _apollo_client__WEBPACK_IMPORTED_MODULE_7__["HttpLink"]({
    uri: process.env.RAZZLE_SUBGRAPH_URL,
    fetch: (cross_fetch__WEBPACK_IMPORTED_MODULE_4___default())
  }),
  cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_7__["InMemoryCache"](),
  defaultOptions: apolloOptions
});
const cachedPrices = {
  sorted: {
    [_addresses__WEBPACK_IMPORTED_MODULE_9__["OPTIMISM"]]: {}
  },
  byKey: {
    [_addresses__WEBPACK_IMPORTED_MODULE_9__["OPTIMISM"]]: {}
  }
};
function putPricesIntoCache(prices, chainId, entitiesKey) {
  if (!prices || !chainId || !entitiesKey) {
    throw new Error('Invalid arguments');
  }
  let ret = true;
  const precision = entitiesKey === "chainlinkPrices" ? 1e8 : 1e30;
  const changedTokens = new Set([]);
  const byKeyNs = cachedPrices.byKey;
  byKeyNs[chainId][entitiesKey] = byKeyNs[chainId][entitiesKey] || {};
  for (const price of prices) {
    const token = price.token.toLowerCase();
    const timestamp = price.timestamp;
    byKeyNs[chainId][entitiesKey][token] = byKeyNs[chainId][entitiesKey][token] || {};
    byKeyNs[chainId][entitiesKey][token][timestamp] = Number(price.value) / precision;
    changedTokens.add(token);
  }
  const sortedNs = cachedPrices.sorted;
  sortedNs[chainId][entitiesKey] = sortedNs[chainId][entitiesKey] || {};
  for (const token of changedTokens) {
    sortedNs[chainId][entitiesKey][token] = Object.entries(byKeyNs[chainId][entitiesKey][token]).map(([timestamp, price]) => [Number(timestamp), price]).sort((a, b) => a[0] - b[0]);
  }
  if (!IS_PRODUCTION) {
    console.time('sizeof call');
    const size = object_sizeof__WEBPACK_IMPORTED_MODULE_5___default()(cachedPrices) / 1024 / 1024;
    console.timeEnd('sizeof call');
    let pricesCount = 0;
    for (const chainId of Object.keys(cachedPrices.sorted)) {
      for (const entitiesKey of Object.keys(cachedPrices.sorted[chainId])) {
        for (const prices of Object.values(cachedPrices.sorted[chainId][entitiesKey])) {
          pricesCount += prices.length;
        }
      }
    }
    logger.debug('Estimated price cache size: %s MB, prices count: %s', size, pricesCount);
  }
  return ret;
}
class TtlCache {
  constructor(ttl = 60, maxKeys) {
    this._cache = {};
    this._ttl = ttl;
    this._maxKeys = maxKeys;
    this._logger = Object(_helpers__WEBPACK_IMPORTED_MODULE_8__["getLogger"])('routes.TtlCache');
  }
  get(key) {
    this._logger.debug('get key %s', key);
    return this._cache[key];
  }
  set(key, value) {
    this._cache[key] = value;
    const keys = Object.keys(this._cache);
    if (this._maxKeys && keys.length >= this._maxKeys) {
      for (let i = 0; i <= keys.length - this._maxKeys; i++) {
        this._logger.debug('delete key %s (max keys)', key);
        delete this._cache[keys[i]];
      }
    }
    setTimeout(() => {
      this._logger.debug('delete key %s (ttl)', key);
      delete this._cache[key];
    }, this._ttl * 1000);
    if (!IS_PRODUCTION) {
      console.time('sizeof call');
      const size = object_sizeof__WEBPACK_IMPORTED_MODULE_5___default()(this._cache) / 1024 / 1024;
      console.timeEnd('sizeof call');
      this._logger.debug('TtlCache cache size %s MB', size);
    }
  }
}
const ttlCache = new TtlCache(60, 100);
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
async function precacheOldPrices(chainId, entitiesKey) {
  logger.info('precache old prices into memory for %s...', chainId);
  const baseRetryTimeout = 10000;
  let oldestTimestamp = parseInt(Date.now() / 1000);
  let i = 0;
  let retryTimeout = baseRetryTimeout;
  let failCount = 0;
  while (i < 100) {
    try {
      const prices = await loadPrices({
        before: oldestTimestamp,
        chainId,
        entitiesKey
      });
      if (prices.length === 0) {
        logger.info('All old prices loaded for chain: %s %s', chainId, entitiesKey);
        break;
      }
      if (!putPricesIntoCache(prices, chainId, entitiesKey)) {
        logger.info('putPricesIntoCache returned false for chain: %s %s. stop', chainId, entitiesKey);
        break;
      }
      oldestTimestamp = prices[prices.length - 1].timestamp - 1;
      failCount = 0;
      retryTimeout = baseRetryTimeout;
    } catch (ex) {
      failCount++;
      logger.warn('Old prices load failed');
      logger.error(ex);
      if (failCount > 10) {
        logger.warn('too many load failures for chainId: %s %s. retry in %s seconds', chainId, entitiesKey, retryTimeout / 1000);
        await sleep(retryTimeout);
        retryTimeout *= 2;
      }
      await sleep(500);
    }
    i++;
  }
}
if (!process.env.DISABLE_PRICES) {
  precacheOldPrices(_addresses__WEBPACK_IMPORTED_MODULE_9__["OPTIMISM"], "chainlinkPrices");
  precacheOldPrices(_addresses__WEBPACK_IMPORTED_MODULE_9__["OPTIMISM"], "fastPrices");
}
let newestPriceTimestamp = parseInt(Date.now() / 1000) - 60 * 5;
async function precacheNewPrices(chainId, entitiesKey) {
  logger.info('Precache new prices into memory chainId: %s %s...', chainId, entitiesKey);
  try {
    const after = newestPriceTimestamp - 60 * 15; // 15 minutes before last update.
    const prices = await loadPrices({
      after,
      chainId,
      entitiesKey
    });
    if (prices.length > 0) {
      logger.info('Loaded %s prices since %s chainId: %s %s', prices.length, toReadable(after), chainId, entitiesKey);
      if (putPricesIntoCache(prices, chainId, entitiesKey)) {
        newestPriceTimestamp = prices[0].timestamp;
      } else {
        logger.warn('Prices were not saved');
      }
    }
  } catch (ex) {
    logger.warn('New prices load failed chainId: %s %s', chainId, entitiesKey);
    logger.error(ex);
  }
  setTimeout(precacheNewPrices, 1000 * 60 * 1, chainId, entitiesKey);
}
if (!process.env.DISABLE_PRICES) {
  precacheNewPrices(_addresses__WEBPACK_IMPORTED_MODULE_9__["OPTIMISM"], "chainlinkPrices");
  precacheNewPrices(_addresses__WEBPACK_IMPORTED_MODULE_9__["OPTIMISM"], "fastPrices");
}
async function loadPrices({
  before,
  after,
  chainId,
  entitiesKey
} = {}) {
  if (!chainId) {
    throw new Error('loadPrices requires chainId');
  }
  if (!entitiesKey) {
    throw new Error('loadPrices requires entitiesKey');
  }
  if (!before) {
    before = parseInt(Date.now() / 1000) + 86400 * 365;
  }
  if (!after) {
    after = 0;
  }
  logger.info('loadPrices %s chainId: %s before: %s, after: %s', entitiesKey, chainId, toReadable(before), after && toReadable(after));
  const fragment = skip => {
    return `${entitiesKey}(
      first: 1000
      skip: ${skip}
      orderBy: timestamp
      orderDirection: desc
      where: {
        timestamp_lte: ${before}
        timestamp_gte: ${after}
        period: any
      }
    ) { value, timestamp, token }\n`;
  };
  const queryString = `{
    p0: ${fragment(0)}
    p1: ${fragment(1000)}
    p2: ${fragment(2000)}
    p3: ${fragment(3000)}
    p4: ${fragment(4000)}
    p5: ${fragment(5000)}
  }`;
  const query = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_7__["gql"])(queryString);
  const graphClient = optimismGraphClient;
  const {
    data
  } = await graphClient.query({
    query
  });
  const prices = [...data.p0, ...data.p1, ...data.p2, ...data.p3, ...data.p4, ...data.p5];
  if (prices.length) {
    logger.debug('Loaded %s prices (%s – %s) for chain %s %s', prices.length, toReadable(prices[prices.length - 1].timestamp), toReadable(prices[0].timestamp), chainId, entitiesKey);
  }
  return prices;
}
function toReadable(ts) {
  return new Date(ts * 1000).toISOString().replace('T', ' ').replace('.000Z', '');
}
function getPriceRange(sortedPrices, from, to, inbound = false) {
  const indexFrom = binSearchPrice(sortedPrices, from, inbound);
  const indexTo = binSearchPrice(sortedPrices, to, !inbound) + 1;
  return [sortedPrices.slice(indexFrom, indexTo), sortedPrices[0][0]];
}
function binSearchPrice(prices, timestamp, gt = true) {
  let left = 0;
  let right = prices.length - 1;
  let mid;
  while (left + 1 < right) {
    mid = Math.floor((left + right) / 2);
    if (prices[mid][0] < timestamp) {
      left = mid;
    } else {
      right = mid;
    }
  }
  const ret = gt ? right : left;
  return ret;
}
function getPrices(from, to, preferableChainId = _addresses__WEBPACK_IMPORTED_MODULE_9__["OPTIMISM"], preferableSource = "chainlink", symbol) {
  var _addresses$preferable;
  const start = Date.now();
  if (preferableSource !== "chainlink" && preferableSource !== "fast") {
    throw createHttpError(400, `Invalid preferableSource ${preferableSource}. Valid options are: chainlink, fast`);
  }
  const validSymbols = new Set(['OP', 'BTC', 'ETH']);
  if (!validSymbols.has(symbol)) {
    throw createHttpError(400, `Invalid symbol ${symbol}`);
  }
  preferableChainId = Number(preferableChainId);
  const validSources = new Set([_addresses__WEBPACK_IMPORTED_MODULE_9__["OPTIMISM"]]);
  if (!validSources.has(preferableChainId)) {
    throw createHttpError(400, `Invalid preferableChainId ${preferableChainId}. Valid options are ${_addresses__WEBPACK_IMPORTED_MODULE_9__["OPTIMISM"]}`);
  }
  const tokenAddress = (_addresses$preferable = _addresses__WEBPACK_IMPORTED_MODULE_9__["addresses"][preferableChainId][symbol]) === null || _addresses$preferable === void 0 ? void 0 : _addresses$preferable.toLowerCase();
  if (!tokenAddress || !cachedPrices.byKey[preferableChainId].chainlinkPrices || !cachedPrices.byKey[preferableChainId].chainlinkPrices[tokenAddress]) {
    return [];
  }
  const cacheKey = `${from}:${to}:${preferableChainId}:${preferableSource}:${symbol}`;
  const fromCache = ttlCache.get(cacheKey);
  if (fromCache) {
    logger.debug('from cache');
    return fromCache;
  }
  const entitiesKey = preferableSource === "chainlink" ? "chainlinkPrices" : "fastPrices";
  const sortedPrices = cachedPrices.sorted[preferableChainId] && cachedPrices.sorted[preferableChainId][entitiesKey] && cachedPrices.sorted[preferableChainId][entitiesKey][tokenAddress] || [];
  let [prices, firstTimestamp] = getPriceRange(sortedPrices, from, to);
  if (preferableSource === "fast" && firstTimestamp > from) {
    // there is no enough fast price data. upfill it with chainlink prices
    const otherSortedPrices = cachedPrices.sorted[preferableChainId] && cachedPrices.sorted[preferableChainId].chainlinkPrices && cachedPrices.sorted[preferableChainId].chainlinkPrices[tokenAddress] || [];
    const [chainlinkPrices] = getPriceRange(otherSortedPrices, from, firstTimestamp, true);
    prices = [...chainlinkPrices, ...prices];
  }
  ttlCache.set(cacheKey, prices);
  logger.debug('getPrices took %sms cacheKey %s', Date.now() - start, cacheKey);
  return prices;
}
const periodsMap = {
  '5m': 60 * 5,
  '15m': 60 * 15,
  '1h': 60 * 60,
  '4h': 60 * 60 * 4,
  '1d': 60 * 60 * 24,
  '1w': 60 * 60 * 24 * 7
};
function getCandles(prices, period) {
  const periodTime = periodsMap[period];
  if (prices.length < 2) {
    return [];
  }
  const candles = [];
  const first = prices[0];
  let prevTsGroup = Math.floor(first[0] / periodTime) * periodTime;
  let prevPrice = first[1];
  let prevTs = first[0];
  let o = prevPrice;
  let h = prevPrice;
  let l = prevPrice;
  let c = prevPrice;
  for (let i = 1; i < prices.length; i++) {
    const [ts, price] = prices[i];
    const tsGroup = ts - ts % periodTime;
    if (prevTs > ts) {
      logger.warn(`Invalid order prevTs: ${prevTs} (${toReadable(prevTs)}) ts: ${ts} (${toReadable(ts)})`);
      continue;
    }
    if (prevTsGroup !== tsGroup) {
      candles.push({
        t: prevTsGroup,
        o,
        h,
        l,
        c
      });
      o = c;
      h = o > c ? o : c;
      l = o < c ? o : c;
    }
    c = price;
    h = h > price ? h : price;
    l = l < price ? l : price;
    prevTsGroup = tsGroup;
    prevTs = ts;
  }
  return candles;
}
function getFromAndTo(req) {
  const granularity = 60; // seconds
  let from = Number(req.query.from) || Math.round(Date.now() / 1000) - 86400 * 90;
  from = Math.floor(from / granularity) * granularity;
  let to = Number(req.query.to) || Math.round(Date.now() / 1000);
  to = Math.ceil(to / granularity) * granularity;
  return [from, to];
}
function createHttpError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}
function routes(app) {
  app.get('/api/total_volumes', async (req, res, next) => {
    const queryString = `
    {
      volumeStats (where : {period:"total"}){
        id
        swap
        mint
        margin
        burn
        liquidation
        period
      }
    }
    `;
    const query = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_7__["gql"])(queryString);
    const graphClient = optimismGraphClient;
    const {
      data
    } = await graphClient.query({
      query
    });
    try {
      const stats = data.volumeStats[0];
      const statsResponse = {
        swap: parseInt(stats.swap) / 1e30,
        mint: parseInt(stats.mint) / 1e30,
        burn: parseInt(stats.burn) / 1e30,
        margin: parseInt(stats.margin) / 1e30,
        liquidation: parseInt(stats.liquidation) / 1e30
      };
      statsResponse.total = statsResponse.swap + statsResponse.mint + statsResponse.burn + statsResponse.margin + statsResponse.liquidation;
      res.set('Cache-Control', 'max-age=60');
      res.send(statsResponse);
    } catch (ex) {
      logger.error(ex);
      next(createHttpError(500, ex.message));
      return;
    }
  });
  app.get('/api/stats', async (req, res, next) => {
    try {
      const stats = await Object(_dataProvider__WEBPACK_IMPORTED_MODULE_10__["getStatsFromSubgraph"])(optimismGraphClient);
      res.set('Cache-Control', 'max-age=60');
      res.send(stats);
    } catch (ex) {
      logger.error(ex);
      next(createHttpError(500, ex.message));
      return;
    }
  });
  app.get('/api/total_volumes_delta', async (req, res, next) => {
    const queryString = `
    {
      volumeStats (first:1 orderBy: timestamp orderDirection: desc where : {period:"daily"}){
        id
        swap
        mint
        margin
        burn
        liquidation
        period
      }
    }
    `;
    const query = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_7__["gql"])(queryString);
    const graphClient = optimismGraphClient;
    const {
      data
    } = await graphClient.query({
      query
    });
    try {
      const stats = data.volumeStats[0];
      const statsResponse = {
        swap: parseInt(stats.swap) / 1e30,
        mint: parseInt(stats.mint) / 1e30,
        burn: parseInt(stats.burn) / 1e30,
        margin: parseInt(stats.margin) / 1e30,
        liquidation: parseInt(stats.liquidation) / 1e30
      };
      statsResponse.total = statsResponse.swap + statsResponse.mint + statsResponse.burn + statsResponse.margin + statsResponse.liquidation;
      res.set('Cache-Control', 'max-age=60');
      res.send(statsResponse);
    } catch (ex) {
      logger.error(ex);
      next(createHttpError(500, ex.message));
      return;
    }
  });
  app.get('/api/earn/:account', async (req, res, next) => {
    const chainName = req.query.chain || 'optimism';
    const validChainNames = new Set(['optimism']);
    if (!validChainNames.has(chainName)) {
      next(createHttpError(400, `Valid chains are: ${Array.from(validChainNames)}`));
      return;
    }
    try {
      const earnData = await Object(_dataProvider__WEBPACK_IMPORTED_MODULE_10__["queryEarnData"])(chainName, req.params.account);
      res.send(earnData);
    } catch (ex) {
      logger.error(ex);
      next(createHttpError(500, ex.message));
      return;
    }
  });
  app.get('/api/mjar-supply', async (req, res) => {
    const apiResponse = await cross_fetch__WEBPACK_IMPORTED_MODULE_4___default()('https://stats.masonjar.finance/api/total_supply');
    const data = (await apiResponse.text()).toString();
    res.set('Content-Type', 'text/plain');
    res.send(formatUnits(data));
  });
  app.get('/api/chart/:symbol', async (req, res, next) => {
    const [from, to] = getFromAndTo(req);
    let prices;
    try {
      prices = getPrices(from, to, req.query.preferableChainId, req.query.preferableSource, req.params.symbol);
    } catch (ex) {
      next(ex);
      return;
    }
    res.set('Cache-Control', 'max-age=60');
    res.send(prices);
  });
  app.get('/api/candles/:symbol', async (req, res, next) => {
    var _req$query$period;
    const [from, to] = getFromAndTo(req);
    let prices;
    try {
      prices = getPrices(from, to, req.query.preferableChainId, req.query.preferableSource, req.params.symbol);
    } catch (ex) {
      next(ex);
      return;
    }
    const period = (_req$query$period = req.query.period) === null || _req$query$period === void 0 ? void 0 : _req$query$period.toLowerCase();
    if (!period || !periodsMap[period]) {
      next(createHttpError(400, `Invalid period. Valid periods are ${Object.keys(periodsMap)}`));
      return;
    }
    const candles = getCandles(prices, period);
    let updatedAt;
    if (prices.length) {
      updatedAt = prices[prices.length - 1][0];
    }
    res.set('Cache-Control', 'max-age=60');
    res.send({
      prices: candles,
      period,
      updatedAt
    });
  });
  const cssAssetsTag = cssLinksFromAssets(assets, 'client');
  const jsAssetsTag = jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin');
  app.get('/*', (req, res, next) => {
    if (res.headersSent) {
      next();
      return;
    }
    const context = {};
    const markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_3__["renderToString"])(__jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["StaticRouter"], {
      context: context,
      location: req.url,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 620,
        columnNumber: 7
      }
    }, __jsx(_App__WEBPACK_IMPORTED_MODULE_6__["default"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 621,
        columnNumber: 9
      }
    })));
    res.set('Content-Type', 'text/html');
    res.status(200).send(`<!doctype html>
          <html lang="">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charset="utf-8" />
              <title>Mason Jar Statistics</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="icon" type="image/png" href="/favicon.png" />
              ${cssAssetsTag}
          </head>
          <body>
              <div id="root">${markup}</div>
              ${jsAssetsTag}
          </body>
      </html>`);
    next();
  });
  app.use('/api', function (err, req, res, next) {
    res.set('Content-Type', 'text/plain');
    const statusCode = Number(err.code) || 500;
    let response = '';
    if (IS_PRODUCTION) {
      if (err.code === 400) {
        response = err.message;
      }
    } else {
      response = err.stack;
    }
    res.status(statusCode);
    res.send(response);
  });
}

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ "./src/routes.js");
/* harmony import */ var _middlewares__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middlewares */ "./src/middlewares.js");



const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
// app.set('trust proxy', true)

app.disable('x-powered-by').use(express__WEBPACK_IMPORTED_MODULE_0___default.a.static("C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\public")).use(__webpack_require__(/*! cors */ "cors")()).use(_middlewares__WEBPACK_IMPORTED_MODULE_2__["requestLogger"])
// .use(csp)
.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('Referrer-Policy', 'same-origin');
  next();
});
app.get('/ping', (req, res, next) => {
  res.send('ok');
  next();
});
Object(_routes__WEBPACK_IMPORTED_MODULE_1__["default"])(app);
/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./src/views/Optimism.js":
/*!*******************************!*\
  !*** ./src/views/Optimism.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/ri */ "react-icons/ri");
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! recharts */ "recharts");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ChartWrapper */ "./src/components/ChartWrapper.js");
/* harmony import */ var _components_VolumeChart__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/VolumeChart */ "./src/components/VolumeChart.js");
/* harmony import */ var _components_FeesChart__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/FeesChart */ "./src/components/FeesChart.js");
/* harmony import */ var _components_GenericChart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/GenericChart */ "./src/components/GenericChart.js");
/* harmony import */ var _dataProvider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../dataProvider */ "./src/dataProvider.js");
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\views\\Optimism.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }












const {
  BigNumber
} = ethers__WEBPACK_IMPORTED_MODULE_1__;
const {
  formatUnits
} = ethers__WEBPACK_IMPORTED_MODULE_1__["utils"];
const NOW = Math.floor(Date.now() / 1000);
function Optimism(props) {
  const DEFAULT_GROUP_PERIOD = 86400;
  const {
    0: groupPeriod,
    1: setGroupPeriod
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(DEFAULT_GROUP_PERIOD);
  const {
    0: fromValue,
    1: setFromValue
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    0: toValue,
    1: setToValue
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    mode
  } = props;
  const setDateRange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(range => {
    setFromValue(new Date(Date.now() - range * 1000).toISOString().slice(0, 10));
    setToValue(undefined);
  }, [setFromValue, setToValue]);
  const from = fromValue ? +new Date(fromValue) / 1000 : undefined;
  const to = toValue ? +new Date(toValue) / 1000 : NOW;
  const params = {
    from,
    to,
    groupPeriod
  };
  const [fundingRateData, fundingRateLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useFundingRateData"])(params);
  // const [volumeData, volumeLoading] = useVolumeDataFromServer(params);
  const [volumeData, totalVolume, volumeLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useVolumeData"])(params);
  //const [totalVolume] = useTotalVolumeFromServer();
  const totalVolumeDelta = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!volumeData || volumeData.length == 0) {
      return null;
    }
    return volumeData[volumeData.length - 1].all;
  }, [volumeData]);
  const [feesData, feesLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useFeesData"])(params);
  const {
    0: totalFees,
    1: totalFeesDelta
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _feesData, _feesData2;
    if (!feesData) {
      return [];
    }
    const total = (_feesData = feesData[feesData.length - 1]) === null || _feesData === void 0 ? void 0 : _feesData.cumulative;
    const delta = total - ((_feesData2 = feesData[feesData.length - 2]) === null || _feesData2 === void 0 ? void 0 : _feesData2.cumulative);
    return [total, delta];
  }, [feesData]);
  const [mjlpData, mjlpLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useMjlpData"])(params);
  const {
    0: totalAum,
    1: totalAumDelta
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _mjlpData, _mjlpData2;
    if (!mjlpData) {
      return [];
    }
    const total = (_mjlpData = mjlpData[mjlpData.length - 1]) === null || _mjlpData === void 0 ? void 0 : _mjlpData.aum;
    const delta = total - ((_mjlpData2 = mjlpData[mjlpData.length - 2]) === null || _mjlpData2 === void 0 ? void 0 : _mjlpData2.aum);
    return [total, delta];
  }, [mjlpData]);
  const [aumPerformanceData, aumPerformanceLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useAumPerformanceData"])(params);
  const [mjlpPerformanceData, mjlpPerformanceLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useMjlpPerformanceData"])(mjlpData, feesData, params);
  const [tradersData, tradersLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useTradersData"])(params);
  const {
    0: openInterest,
    1: openInterestDelta
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _tradersData$data, _tradersData$data2;
    if (!tradersData) {
      return [];
    }
    const total = (_tradersData$data = tradersData.data[tradersData.data.length - 1]) === null || _tradersData$data === void 0 ? void 0 : _tradersData$data.openInterest;
    const delta = total - ((_tradersData$data2 = tradersData.data[tradersData.data.length - 2]) === null || _tradersData$data2 === void 0 ? void 0 : _tradersData$data2.openInterest);
    return [total, delta];
  }, [tradersData]);
  const [swapSources, swapSourcesLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useSwapSources"])(params);
  const swapSourcesKeys = Object.keys((swapSources || []).reduce((memo, el) => {
    Object.keys(el).forEach(key => {
      if (key === "all" || key === "timestamp") return;
      memo[key] = true;
    });
    return memo;
  }, {}));
  const [usersData, usersLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useUsersData"])(params);
  const {
    0: totalUsers,
    1: totalUsersDelta
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _usersData, _usersData2;
    if (!usersData) {
      return [null, null];
    }
    const total = (_usersData = usersData[usersData.length - 1]) === null || _usersData === void 0 ? void 0 : _usersData.uniqueCountCumulative;
    const prevTotal = (_usersData2 = usersData[usersData.length - 2]) === null || _usersData2 === void 0 ? void 0 : _usersData2.uniqueCountCumulative;
    const delta = total && prevTotal ? total - prevTotal : null;
    return [total, delta];
  }, [usersData]);
  const [lastSubgraphBlock] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useLastSubgraphBlock"])();
  const [lastBlock] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useLastBlock"])();
  const isObsolete = lastSubgraphBlock && lastBlock && lastBlock.timestamp - lastSubgraphBlock.timestamp > 3600;
  const {
    0: isExperiment,
    1: setIsExperiment
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setIsExperiment(window.localStorage.getItem("experiment"));
  }, [setIsExperiment]);
  const showForm = false;
  return __jsx("div", {
    className: "Home",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 5
    }
  }, __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 7
    }
  }, "Analytics / Optimism"), lastSubgraphBlock && lastBlock && __jsx("p", {
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("page-description", {
      warning: isObsolete
    }),
    style: {
      marginTop: "-1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 9
    }
  }, isObsolete && "Data is obsolete. ", "Updated ", moment__WEBPACK_IMPORTED_MODULE_2___default()(lastSubgraphBlock.timestamp * 1000).fromNow(), "\xA0at block", " ", __jsx("a", {
    target: "_blank",
    href: `https://optimistic.etherscan.io/block/${lastSubgraphBlock.number}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 11
    }
  }, lastSubgraphBlock.number)), showForm && __jsx("div", {
    className: "form",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 201,
      columnNumber: 9
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 202,
      columnNumber: 11
    }
  }, __jsx("label", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 203,
      columnNumber: 13
    }
  }, "Period"), __jsx("input", {
    type: "date",
    value: fromValue,
    onChange: evt => setFromValue(evt.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 204,
      columnNumber: 13
    }
  }), "\xA0\u2014\xA0", __jsx("input", {
    type: "date",
    value: toValue,
    onChange: evt => setToValue(evt.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 210,
      columnNumber: 13
    }
  }), __jsx("button", {
    onClick: evt => setDateRange(86400 * 29),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 215,
      columnNumber: 13
    }
  }, "30 days"), __jsx("button", {
    onClick: evt => setDateRange(86400 * 6),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 216,
      columnNumber: 13
    }
  }, "7 days"))), __jsx("div", {
    className: "chart-grid",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 220,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 9
    }
  }, totalVolume ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 15
    }
  }, "Total Volume"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalVolume, {
    currency: true
  }), totalVolumeDelta && __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 228,
      columnNumber: 19
    }
  }, "+", Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalVolumeDelta, {
    currency: true,
    compact: true
  })))) : volumeLoading ? __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 13
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 245,
      columnNumber: 15
    }
  }, "Total Volume"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(0, {
    currency: true
  })))), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 252,
      columnNumber: 9
    }
  }, totalFees ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 15
    }
  }, "Total Fees"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalFees, {
    currency: true
  }), __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 17
    }
  }, "+", Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalFeesDelta, {
    currency: true,
    compact: true
  })))) : feesLoading ? __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 13
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 15
    }
  }, "Total Fees"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(0, {
    currency: true
  })))), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 281,
      columnNumber: 9
    }
  }, totalAum ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 284,
      columnNumber: 15
    }
  }, "MJLP Pool"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 285,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalAum, {
    currency: true
  }), __jsx("span", {
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("total-stat-delta", totalAumDelta > 0 ? "plus" : "minus"),
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 287,
      columnNumber: 17
    }
  }, totalAumDelta > 0 ? "+" : "", Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalAumDelta, {
    currency: true,
    compact: true
  })))) : __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 303,
      columnNumber: 13
    }
  })), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 306,
      columnNumber: 9
    }
  }, totalUsers ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 309,
      columnNumber: 15
    }
  }, "Total Users"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 310,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalUsers), __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 312,
      columnNumber: 17
    }
  }, "+", Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalUsersDelta)))) : usersLoading ? __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 321,
      columnNumber: 13
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 324,
      columnNumber: 15
    }
  }, "Total Users"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 325,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(0)))), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 329,
      columnNumber: 9
    }
  }, openInterest ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 332,
      columnNumber: 15
    }
  }, "Open Interest"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 333,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(openInterest, {
    currency: true
  }), __jsx("span", {
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("total-stat-delta", openInterestDelta > 0 ? "plus" : "minus"),
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 335,
      columnNumber: 17
    }
  }, openInterestDelta > 0 ? "+" : "", Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(openInterestDelta, {
    currency: true,
    compact: true
  })))) : tradersLoading ? __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 351,
      columnNumber: 13
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 354,
      columnNumber: 15
    }
  }, "Open Interest"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 355,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(0, {
    currency: true
  })))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 361,
      columnNumber: 9
    }
  }, __jsx(_components_VolumeChart__WEBPACK_IMPORTED_MODULE_8__["default"], {
    data: volumeData,
    loading: volumeLoading,
    chartHeight: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    yaxisWidth: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    xaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatter"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 362,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 373,
      columnNumber: 9
    }
  }, __jsx(_components_FeesChart__WEBPACK_IMPORTED_MODULE_9__["default"], {
    data: feesData,
    loading: feesLoading,
    chartHeight: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    yaxisWidth: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    xaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatter"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 374,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 385,
      columnNumber: 9
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "MJAR & Mjlp Supply",
    loading: mjlpLoading,
    data: mjlpData,
    csvFields: [{
      key: "aum"
    }, {
      key: "mjlpSupply"
    }],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 386,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 392,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: mjlpData,
    syncId: "syncMjlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 393,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 394,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 395,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "aum",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 400,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 405,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 410,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    strokeWidth: 2,
    unit: "$",
    dot: false,
    dataKey: "aum",
    stackId: "a",
    name: "MJAR",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 411,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    strokeWidth: 2,
    dot: false,
    dataKey: "mjlpSupply",
    stackId: "a",
    name: "MJLP Supply",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][1],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 422,
      columnNumber: 17
    }
  }))))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 437,
      columnNumber: 9
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Mjlp Performance",
    loading: mjlpLoading,
    data: mjlpPerformanceData,
    csvFields: [{
      key: "syntheticPrice"
    }, {
      key: "mjlpPrice"
    }, {
      key: "mjlpPlusFees"
    }, {
      key: "lpBtcPrice"
    }, {
      key: "lpEthPrice"
    }, {
      key: "performanceSyntheticCollectedFees"
    }, {
      key: "indexBtcCount"
    }, {
      key: "indexEthCount"
    }, {
      key: "indexAvaxCount"
    }, {
      key: "indexStableCount"
    }, {
      key: "BTC_WEIGHT"
    }, {
      key: "ETH_WEIGHT"
    }, {
      key: "OP_WEIGHT"
    }, {
      key: "STABLE_WEIGHT"
    }],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 438,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 459,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: mjlpPerformanceData,
    syncId: "syncMjlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 460,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 461,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 462,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "performanceSyntheticCollectedFees",
    domain: [80, 180],
    unit: "%",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 467,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 474,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 479,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    dataKey: "performanceLpBtcCollectedFees",
    name: "% LP BTC-USDC (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 480,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    dataKey: "performanceLpEthCollectedFees",
    name: "% LP ETH-USDC (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 489,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    dataKey: "performanceSyntheticCollectedFees",
    name: "% Index (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 498,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 509,
      columnNumber: 13
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 510,
      columnNumber: 15
    }
  }, __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 511,
      columnNumber: 17
    }
  }, "% of Index (with fees)"), " ", "is MJLP with fees / Index Price * 100. Index is a basket of 25% BTC, 25% ETH, 50% USDC rebalanced once\xA0a\xA0day", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 514,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 515,
      columnNumber: 17
    }
  }, "% of LP ETH-USDC (with fees)"), " ", "is MJLP Price with fees / LP ETH-USDC * 100", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 519,
      columnNumber: 17
    }
  }))))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 525,
      columnNumber: 9
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Mjlp Price Comparison",
    loading: mjlpLoading,
    data: mjlpPerformanceData,
    csvFields: [{
      key: "syntheticPrice"
    }, {
      key: "mjlpPrice"
    }, {
      key: "mjlpPlusFees"
    }, {
      key: "lpBtcPrice"
    }, {
      key: "lpEthPrice"
    }, {
      key: "performanceSyntheticCollectedFees"
    }],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 526,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 539,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: mjlpPerformanceData,
    syncId: "syncMjlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 540,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 541,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 542,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "performanceSyntheticCollectedFees",
    domain: [60, 210],
    unit: "%",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 547,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "mjlpPrice",
    domain: [0.4, 1.7],
    orientation: "right",
    yAxisId: "right",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 554,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 562,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 567,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpBtcCollectedFees",
    name: "% LP BTC-USDC (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 568,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpEthCollectedFees",
    name: "% LP ETH-USDC (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 578,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceSyntheticCollectedFees",
    name: "% Index (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 588,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    unit: "$",
    strokeWidth: 1,
    yAxisId: "right",
    dot: false,
    dataKey: "syntheticPrice",
    name: "Index Price",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 599,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    unit: "$",
    strokeWidth: 1,
    yAxisId: "right",
    dot: false,
    dataKey: "mjlpPrice",
    name: "Mjlp Price",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][1],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 610,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    unit: "$",
    strokeWidth: 1,
    yAxisId: "right",
    dot: false,
    dataKey: "mjlpPlusFees",
    name: "Mjlp w/ fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][3],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 621,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    unit: "$",
    strokeWidth: 1,
    yAxisId: "right",
    dot: false,
    dataKey: "lpBtcPrice",
    name: "LP BTC-USDC",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 632,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    unit: "$",
    strokeWidth: 1,
    yAxisId: "right",
    dot: false,
    dataKey: "lpEthPrice",
    name: "LP ETH-USDC",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 643,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 656,
      columnNumber: 13
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 657,
      columnNumber: 15
    }
  }, __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][3]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 658,
      columnNumber: 17
    }
  }, "Mjlp with fees"), " is based on MJLP share of fees received", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 661,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 662,
      columnNumber: 17
    }
  }, "% of Index (with fees)"), " ", "is Mjlp with fees / Index Price * 100", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 666,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 667,
      columnNumber: 17
    }
  }, "% of LP ETH-USDC (with fees)"), " ", "is Mjlp Price with fees / LP ETH-USDC * 100", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 671,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 672,
      columnNumber: 17
    }
  }, "Index Price"), " is 25% BTC, 25% ETH, 50% USDC")))), isExperiment && __jsx("div", {
    className: "chart-cell experiment",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 679,
      columnNumber: 11
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Performance vs. Index",
    loading: mjlpLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 680,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 681,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: mjlpPerformanceData,
    syncId: "syncMjlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 682,
      columnNumber: 17
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 683,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 684,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "performanceSyntheticCollectedFees",
    domain: [80, 120],
    unit: "%",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 689,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 696,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 701,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceSyntheticCollectedFees",
    name: "Collected Fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 702,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceSyntheticDistributedUsd",
    name: "Distributed Usd",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][1],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 712,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceSyntheticDistributedEth",
    name: "Distributed Eth",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 722,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceSynthetic",
    name: "No Fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][3],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 732,
      columnNumber: 19
    }
  }))))), isExperiment && __jsx("div", {
    className: "chart-cell experiment",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 748,
      columnNumber: 11
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Performance vs. ETH LP",
    loading: mjlpLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 749,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 750,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: mjlpPerformanceData,
    syncId: "syncMjlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 751,
      columnNumber: 17
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 752,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 753,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "performanceLpEthCollectedFees",
    domain: [80, 120],
    unit: "%",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 758,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 765,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 770,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpEthCollectedFees",
    name: "Collected Fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 771,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpEthDistributedUsd",
    name: "Distributed Usd",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][1],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 781,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpEthDistributedEth",
    name: "Distributed Eth",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 791,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpEth",
    name: "No Fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][3],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 801,
      columnNumber: 19
    }
  }))))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 816,
      columnNumber: 9
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Traders Net PnL",
    loading: tradersLoading,
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data,
    csvFields: [{
      key: "pnl",
      name: "Net PnL"
    }, {
      key: "pnlCumulative",
      name: "Cumulative PnL"
    }],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 817,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    syncId: "tradersId",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 826,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ComposedChart"], {
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 831,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 832,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 833,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    domain: [-(tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxAbsOfPnlAndCumulativePnl) * 1.05, (tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxAbsOfPnlAndCumulativePnl) * 1.05],
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 838,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatter"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 846,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 851,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Bar"], {
    type: "monotone",
    fill: mode == "dark" ? "#FFFFFF" : "#000000",
    dot: false,
    dataKey: "pnl",
    name: "Net PnL",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 852,
      columnNumber: 17
    }
  }, ((tradersData === null || tradersData === void 0 ? void 0 : tradersData.data) || []).map((item, i) => {
    return __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
      key: `cell-${i}`,
      fill: item.pnl > 0 ? "#22c761" : "#f93333",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 861,
        columnNumber: 23
      }
    });
  })), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    type: "monotone",
    strokeWidth: 2,
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4],
    dataKey: "pnlCumulative",
    name: "Cumulative PnL",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 868,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 877,
      columnNumber: 13
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 878,
      columnNumber: 15
    }
  }, "Considers settled (closed) positions"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 879,
      columnNumber: 15
    }
  }, "Fees are not factored into PnL")))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 883,
      columnNumber: 9
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Traders Profit vs. Loss",
    loading: tradersLoading,
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data,
    csvFields: [{
      key: "profit"
    }, {
      key: "loss"
    }, {
      key: "profitCumulative"
    }, {
      key: "lossCumulative"
    }],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 884,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    syncId: "tradersId",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 895,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ComposedChart"], {
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data,
    barGap: 0,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 900,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 901,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 902,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    domain: [-(tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxProfitLoss) * 1.05, (tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxProfitLoss) * 1.05],
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 907,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    domain: [-(tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxCumulativeProfitLoss) * 1.1, (tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxCumulativeProfitLoss) * 1.1],
    orientation: "right",
    yAxisId: "right",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 915,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatter"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 925,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 930,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Area"], {
    yAxisId: "right",
    type: "monotone",
    stroke: 0,
    fill: "#22c761",
    fillOpacity: "0.4",
    dataKey: "profitCumulative",
    name: "Cumulative Profit",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 931,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Area"], {
    yAxisId: "right",
    type: "monotone",
    stroke: 0,
    fill: "#f93333",
    fillOpacity: "0.4",
    dataKey: "lossCumulative",
    name: "Cumulative Loss",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 940,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Bar"], {
    type: "monotone",
    fill: "#22c761",
    dot: false,
    dataKey: "profit",
    name: "Profit",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 949,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Bar"], {
    type: "monotone",
    fill: "#f93333",
    dot: false,
    dataKey: "loss",
    name: "Loss",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 956,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 965,
      columnNumber: 13
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 966,
      columnNumber: 15
    }
  }, "Considers settled (closed) positions"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 967,
      columnNumber: 15
    }
  }, "Fees are not factored into PnL")))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 971,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    loading: fundingRateLoading,
    title: "Borrowing Rate Annualized",
    data: fundingRateData,
    yaxisDataKey: "ETH",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterPercent"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterPercent"],
    items: [{
      key: "OP",
      color: "#7C43DA"
    }, {
      key: "ETH",
      color: "#6185F5"
    }, {
      key: "BTC",
      color: "#F7931A"
    }, {
      key: "USDC",
      color: "#2775CA"
    }, {
      key: "USDT",
      color: "#67B18A"
    }, {
      key: "DAI",
      color: "#FAC044"
    }],
    type: "Line",
    yaxisDomain: [0, 90 /* ~87% is a maximum yearly borrow rate */],
    isCoinChart: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 972,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 992,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    loading: tradersLoading,
    title: "Open Interest",
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data.map(item => _objectSpread({
      all: item.openInterest
    }, item)),
    yaxisDataKey: "openInterest",
    items: [{
      key: "shortOpenInterest",
      name: "Short",
      color: "#f93333"
    }, {
      key: "longOpenInterest",
      name: "Long",
      color: "#22c761"
    }],
    type: "Bar",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 993,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1008,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: aumPerformanceLoading,
    title: "MJAR Performance Annualized",
    data: aumPerformanceData,
    yaxisDataKey: "apr",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterPercent"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterPercent"],
    items: [{
      key: "apr",
      name: "APR",
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0]
    }],
    description: "Formula = Daily Fees / MJLP Pool * 365 days * 100",
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1009,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1022,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: aumPerformanceLoading,
    title: "MJAR Daily Usage",
    data: aumPerformanceData,
    yaxisDataKey: "usage",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterPercent"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterPercent"],
    items: [{
      key: "usage",
      name: "Daily Usage",
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4]
    }],
    description: "Formula = Daily Volume / MJLP Pool * 100",
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1023,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1036,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: usersLoading,
    title: "Unique Users",
    data: usersData,
    yaxisDataKey: "uniqueSum",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatterUnits"],
    items: [{
      key: "uniqueSwapCount",
      name: "Swaps"
    }, {
      key: "uniqueMarginCount",
      name: "Margin trading"
    }, {
      key: "uniqueMintBurnCount",
      name: "Mint & Burn MJLP"
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1037,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1054,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: usersLoading,
    title: "New Users",
    data: usersData === null || usersData === void 0 ? void 0 : usersData.map(item => _objectSpread(_objectSpread({}, item), {}, {
      all: item.newCount
    })),
    yaxisDataKey: "newCount",
    rightYaxisDataKey: "uniqueCountCumulative",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatterUnits"],
    items: [{
      key: "newSwapCount",
      name: "Swap"
    }, {
      key: "newMarginCount",
      name: "Margin trading"
    }, {
      key: "newMintBurnCount",
      name: "Mint & Burn"
    }, {
      key: "uniqueCountCumulative",
      name: "Cumulative",
      type: "Line",
      yAxisId: "right",
      strokeWidth: 2,
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4]
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1055,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1081,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: usersLoading,
    title: "New vs. Existing Users",
    data: usersData === null || usersData === void 0 ? void 0 : usersData.map(item => _objectSpread(_objectSpread({}, item), {}, {
      all: item.uniqueCount
    })),
    yaxisDataKey: "uniqueCount",
    rightYaxisDataKey: "oldPercent",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatterUnits"],
    items: [{
      key: "newCount",
      name: "New"
    }, {
      key: "oldCount",
      name: "Existing"
    }, {
      key: "oldPercent",
      name: "Existing %",
      yAxisId: "right",
      type: "Line",
      strokeWidth: 2,
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4],
      unit: "%"
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1082,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1111,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: usersLoading,
    title: "User Actions",
    data: (usersData || []).map(item => _objectSpread(_objectSpread({}, item), {}, {
      all: item.actionCount
    })),
    yaxisDataKey: "actionCount",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatterUnits"],
    items: [{
      key: "actionSwapCount",
      name: "Swaps"
    }, {
      key: "actionMarginCount",
      name: "Margin trading"
    }, {
      key: "actionMintBurnCount",
      name: "Mint & Burn MJLP"
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1112,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1132,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    loading: swapSourcesLoading,
    title: "Swap Sources",
    data: swapSources,
    items: swapSourcesKeys.map(key => ({
      key
    })),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1133,
      columnNumber: 11
    }
  }))));
}
/* harmony default export */ __webpack_exports__["default"] = (Optimism);

/***/ }),

/***/ "./src/views/Referrals.js":
/*!********************************!*\
  !*** ./src/views/Referrals.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/ri */ "react-icons/ri");
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");
/* harmony import */ var _components_GenericChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/GenericChart */ "./src/components/GenericChart.js");
/* harmony import */ var _dataProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dataProvider */ "./src/dataProvider.js");
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\views\\Referrals.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







const NOW = Math.floor(Date.now() / 1000);
function Referrals(props) {
  var _props$match, _props$match$params;
  const {
    0: fromValue,
    1: setFromValue
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    0: toValue,
    1: setToValue
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const from = fromValue ? +new Date(fromValue) / 1000 : undefined;
  const to = toValue ? +new Date(toValue) / 1000 : NOW;
  const params = {
    from,
    to,
    chainName: ((_props$match = props.match) === null || _props$match === void 0 ? void 0 : (_props$match$params = _props$match.params) === null || _props$match$params === void 0 ? void 0 : _props$match$params.chainName) || 'optimism'
  };
  const [referralsData, referralsLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_6__["useReferralsData"])(params);
  const stats = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _referralsData, _referralsData2, _referralsData3, _referralsData4, _referralsData5, _referralsData6, _referralsData7, _referralsData8, _referralsData9, _referralsData10;
    if (!referralsData) {
      return null;
    }
    const totalVolume = (_referralsData = referralsData[referralsData.length - 1]) === null || _referralsData === void 0 ? void 0 : _referralsData.volumeCumulative;
    const prevTotalVolume = (_referralsData2 = referralsData[referralsData.length - 2]) === null || _referralsData2 === void 0 ? void 0 : _referralsData2.volumeCumulative;
    const totalVolumeDelta = totalVolume && prevTotalVolume ? totalVolume - prevTotalVolume : null;
    const totalDiscountUsd = (_referralsData3 = referralsData[referralsData.length - 1]) === null || _referralsData3 === void 0 ? void 0 : _referralsData3.discountUsdCumulative;
    const prevTotalDiscountUsd = (_referralsData4 = referralsData[referralsData.length - 2]) === null || _referralsData4 === void 0 ? void 0 : _referralsData4.discountUsdCumulative;
    const totalDiscountUsdDelta = totalDiscountUsd && prevTotalDiscountUsd ? totalDiscountUsd - prevTotalDiscountUsd : null;
    const totalReferrerRebateUsd = (_referralsData5 = referralsData[referralsData.length - 1]) === null || _referralsData5 === void 0 ? void 0 : _referralsData5.discountUsdCumulative;
    const prevTotalReferrerRebateUsd = (_referralsData6 = referralsData[referralsData.length - 2]) === null || _referralsData6 === void 0 ? void 0 : _referralsData6.discountUsdCumulative;
    const totalReferrerRebateUsdDelta = totalReferrerRebateUsd && prevTotalReferrerRebateUsd ? totalReferrerRebateUsd - prevTotalReferrerRebateUsd : null;
    const totalReferrersCount = (_referralsData7 = referralsData[referralsData.length - 1]) === null || _referralsData7 === void 0 ? void 0 : _referralsData7.referrersCountCumulative;
    const prevTotalReferrersCount = (_referralsData8 = referralsData[referralsData.length - 2]) === null || _referralsData8 === void 0 ? void 0 : _referralsData8.referrersCountCumulative;
    const totalReferrersCountDelta = totalReferrersCount && prevTotalReferrersCount ? totalReferrersCount - prevTotalReferrersCount : null;
    const totalReferralsCount = (_referralsData9 = referralsData[referralsData.length - 1]) === null || _referralsData9 === void 0 ? void 0 : _referralsData9.referralsCountCumulative;
    const prevTotalReferralsCount = (_referralsData10 = referralsData[referralsData.length - 2]) === null || _referralsData10 === void 0 ? void 0 : _referralsData10.referralsCountCumulative;
    const totalReferralsCountDelta = totalReferralsCount && prevTotalReferralsCount ? totalReferralsCount - prevTotalReferralsCount : null;
    return {
      totalVolume,
      totalVolumeDelta,
      totalDiscountUsd,
      totalDiscountUsdDelta,
      totalReferrerRebateUsd,
      totalReferrerRebateUsdDelta,
      totalReferrersCount,
      totalReferrersCountDelta,
      totalReferralsCount,
      totalReferralsCountDelta
    };
  }, [referralsData]);
  const [lastSubgraphBlock] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_6__["useLastSubgraphBlock"])();
  const [lastBlock] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_6__["useLastBlock"])();
  const isObsolete = lastSubgraphBlock && lastBlock && lastBlock.timestamp - lastSubgraphBlock.timestamp > 3600;
  const {
    0: isExperiment,
    1: setIsExperiment
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setIsExperiment(window.localStorage.getItem('experiment'));
  }, [setIsExperiment]);
  return __jsx("div", {
    className: "Home",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 5
    }
  }, __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 7
    }
  }, "Analytics / Referrals"), lastSubgraphBlock && lastBlock && __jsx("p", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('page-description', {
      warning: isObsolete
    }),
    style: {
      marginTop: '-1rem'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 9
    }
  }, isObsolete && "Data is obsolete. ", "Updated ", moment__WEBPACK_IMPORTED_MODULE_1___default()(lastSubgraphBlock.timestamp * 1000).fromNow(), "\xA0at block ", __jsx("a", {
    target: "_blank",
    rel: "noreferrer",
    href: `https://arbiscan.io/block/${lastSubgraphBlock.number}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 26
    }
  }, lastSubgraphBlock.number)), __jsx("div", {
    className: "chart-grid",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 9
    }
  }, stats ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 13
    }
  }, "Referral Volume"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 13
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(stats.totalVolume, {
    currency: true
  }), stats.totalVolumeDelta && __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 17
    }
  }, "+", Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(stats.totalVolumeDelta, {
    currency: true,
    compact: true
  })))) : __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_2__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 9
    }
  }, stats ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 13
    }
  }, "Traders Rebates"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 13
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(stats.totalDiscountUsd, {
    currency: true
  }), stats.totalDiscountUsdDelta && __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 17
    }
  }, "+", Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(stats.totalDiscountUsdDelta, {
    currency: true,
    compact: true
  })))) : __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_2__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 9
    }
  }, stats ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 13
    }
  }, "Affiliates Rebates"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 13
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(stats.totalReferrerRebateUsd, {
    currency: true
  }), stats.totalReferrerRebateUsdDelta && __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 17
    }
  }, "+", Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["formatNumber"])(stats.totalReferrerRebateUsdDelta, {
    currency: true,
    compact: true
  })))) : __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_2__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 9
    }
  }, stats ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 13
    }
  }, "Affiliates Registered"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 13
    }
  }, stats.totalReferrersCount, stats.totalReferrersCountDelta ? __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 17
    }
  }, "+", stats.totalReferrersCountDelta) : null)) : __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_2__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 9
    }
  }, stats ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 13
    }
  }, "Referrals Registrations"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 13
    }
  }, stats.totalReferralsCount, stats.totalReferralsCountDelta ? __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 17
    }
  }, "+", stats.totalReferralsCountDelta) : null)) : __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_2__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 148,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_5__["default"], {
    syncId: "syncMjlp",
    loading: referralsLoading,
    title: "Referrals Volume",
    data: referralsData,
    yaxisDataKey: "volume",
    rightYaxisDataKey: "volumeCumulative",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["tooltipLabelFormatterUnits"],
    items: [{
      key: 'volume',
      name: 'Daily',
      unit: '$'
    }, {
      key: 'volumeCumulative',
      name: 'Cumulative',
      type: 'Line',
      yAxisId: 'right',
      strokeWidth: 2,
      color: _helpers__WEBPACK_IMPORTED_MODULE_4__["COLORS"][4],
      unit: '$'
    }],
    type: "Composed",
    description: "Volume generated by registered referrals",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 12
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_5__["default"], {
    syncId: "syncMjlp",
    loading: referralsLoading,
    title: "Referrals Rebates",
    data: referralsData === null || referralsData === void 0 ? void 0 : referralsData.map(item => _objectSpread({
      all: item.totalRebateUsd.toFixed(2)
    }, item)),
    yaxisDataKey: "totalRebateUsd",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["tooltipLabelFormatterUnits"],
    items: [{
      key: 'discountUsd',
      name: 'Discount',
      unit: '$'
    }, {
      key: 'referrerRebateUsd',
      name: 'Rebates',
      unit: '$'
    }],
    type: "Bar",
    description: "Rebates go to Affiliates, Discount go to Traders",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 12
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_5__["default"], {
    syncId: "syncMjlp",
    loading: referralsLoading,
    title: "Registered Affiliates",
    data: referralsData,
    yaxisDataKey: "referrersCount",
    rightYaxisDataKey: "referrersCountCumulative",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["tooltipLabelFormatterUnits"],
    items: [{
      key: 'referrersCount',
      type: 'Bar',
      name: 'Daily'
    }, {
      key: 'referrersCountCumulative',
      strokeWidth: 2,
      yAxisId: 'right',
      type: 'Line',
      name: 'Cumulative Affiliates',
      color: _helpers__WEBPACK_IMPORTED_MODULE_4__["COLORS"][4]
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 196,
      columnNumber: 12
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 220,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_5__["default"], {
    syncId: "syncMjlp",
    loading: referralsLoading,
    title: "Referrals Registrations",
    data: referralsData,
    yaxisDataKey: "referralsCount",
    rightYaxisDataKey: "referralsCountCumulative",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_4__["tooltipLabelFormatterUnits"],
    items: [{
      key: 'referralsCount',
      type: 'Bar',
      name: 'Daily'
    }, {
      key: 'referralsCountCumulative',
      strokeWidth: 2,
      yAxisId: 'right',
      type: 'Line',
      name: 'Cumulative Referrals',
      color: _helpers__WEBPACK_IMPORTED_MODULE_4__["COLORS"][4]
    }],
    type: "Composed",
    description: "Traders registrations with referral code",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 12
    }
  }))));
}
/* harmony default export */ __webpack_exports__["default"] = (Referrals);

/***/ }),

/***/ "./src/views/Trading.js":
/*!******************************!*\
  !*** ./src/views/Trading.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");
/* harmony import */ var _dataProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dataProvider */ "./src/dataProvider.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! recharts */ "recharts");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\views\\Trading.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





const {
  BigNumber
} = ethers__WEBPACK_IMPORTED_MODULE_1__;
const {
  formatUnits
} = ethers__WEBPACK_IMPORTED_MODULE_1__["utils"];
function Trading() {
  const {
    0: from,
    1: setFrom
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["tsToIso"])(Date.now() - 86400000 * 3));
  const {
    0: to,
    1: setTo
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const fromTs = +new Date(from) / 1000;
  const toTs = to !== null && to !== void 0 ? to : +new Date(to) / 1000;
  const params = {
    from: fromTs,
    to: toTs
  };
  const [btcData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])(`/api/prices/BTC`, params), []);
  const [ethData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])(`/api/prices/ETH`, params), []);
  const [bnbData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])(`/api/prices/BNB`, params), []);
  const assetChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    const all = {};
    const options = [['BTC', btcData], ['ETH', ethData], ['BNB', bnbData]];
    options.forEach(([name, assetData]) => {
      if (!assetData || assetData.length === 0) {
        return;
      }
      let maxPrice = 0;
      let minPrice = Infinity;
      all[name] = {
        data: assetData.map(item => {
          const price = item.price / 1e8;
          if (price > maxPrice) {
            maxPrice = price;
          }
          if (price < minPrice) {
            minPrice = price;
          }
          return {
            date: new Date(item.timestamp * 1000),
            price: price,
            poolAmount: item.poolAmount
          };
        })
      };
      all[name].maxPrice = maxPrice;
      all[name].minPrice = minPrice;
    });
    return all;
  }, [btcData, ethData, bnbData]);
  const [pnlData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])('/api/marginPnl', params), []);
  const pnlChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    return pnlData.map(item => {
      if (!item.metrics) {
        return {
          date: new Date(item.timestamp * 1000)
        };
      }
      return {
        date: new Date(item.timestamp * 1000),
        net: item.metrics.net,
        profits: item.metrics.profits,
        loss: item.metrics.loss,
        long: item.metrics.long,
        short: item.metrics.short
      };
    });
  }, [pnlData]);
  const pnlMin = pnlChartData.length ? pnlChartData[pnlChartData.length - 1].loss : 0;
  const pnlMax = pnlChartData.length ? pnlChartData[pnlChartData.length - 1].profits : 0;
  const [liquidationsData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])('api/liquidations', {
    from: fromTs,
    to: toTs
  }), []);
  const liquidationsChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    let cum = 0;
    let longCum = 0;
    let shortCum = 0;
    return liquidationsData.map(item => {
      const collateral = item.collateral || 0;
      cum += collateral;
      if (item.isLong) {
        longCum += collateral;
      } else {
        shortCum += collateral;
      }
      return {
        date: new Date(item.timestamp * 1000),
        collateral: cum,
        long: longCum,
        short: shortCum
      };
    });
  }, [liquidationsData]);
  const [feesData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])('/api/fees', _objectSpread({
    disableGrouping: 1
  }, params)), []);
  const feesChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    const cum = {};
    return feesData.map(item => {
      cum[item.type] = (cum[item.type] || 0) + item.value;
      const all = Object.values(cum).reduce((sum, value) => sum + value);
      return _objectSpread(_objectSpread({}, cum), {}, {
        all,
        date: new Date(item.timestamp * 1000)
      });
    });
  }, [feesData]);
  const [swapSourcesData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])('/api/swapSources', _objectSpread({
    period: 3600,
    rawSource: 1
  }, params)), []);
  const swapSourcesFilteredKeys = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (swapSourcesData.length === 0) {
      return [];
    }
    const count = {};
    swapSourcesData.forEach(item => {
      if (!item.metrics) {
        return;
      }
      Object.keys(item.metrics).forEach(key => {
        count[key] = (count[key] || 0) + 1;
      });
    });
    return Object.keys(count).filter(key => count[key] > 1);
  }, [swapSourcesData]);
  const swapSourcesChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (swapSourcesFilteredKeys.length === 0) {
      return [];
    }
    let cum = {};
    return swapSourcesData.map(item => {
      let all = 0;
      swapSourcesFilteredKeys.forEach(key => {
        if (item.metrics && item.metrics[key]) {
          cum[key] = (cum[key] || 0) + item.metrics[key];
          all += cum[key];
        }
      });
      return _objectSpread({
        date: new Date(item.timestamp * 1000),
        all
      }, cum);
    });
  }, [swapSourcesData, swapSourcesFilteredKeys]);
  const COLORS = ['red', 'green', 'blue', 'lightblue', 'purple', 'pink', 'brown', 'orange'];
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 7
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 9
    }
  }, __jsx("label", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 11
    }
  }, "From"), __jsx("input", {
    type: "datetime-local",
    value: from,
    onChange: evt => setFrom(evt.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 11
    }
  })), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 9
    }
  }, __jsx("label", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 11
    }
  }, "To"), __jsx("input", {
    type: "datetime-local",
    value: to,
    onChange: evt => setTo(evt.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 187,
      columnNumber: 11
    }
  }))), Object.entries(assetChartData).map(([name, {
    data,
    maxPrice,
    minPrice
  }]) => {
    return __jsx("div", {
      key: name,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 191,
        columnNumber: 16
      }
    }, __jsx("h2", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 192,
        columnNumber: 11
      }
    }, name), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
      width: "100%",
      height: 600,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 11
      }
    }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ComposedChart"], {
      data: data,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 194,
        columnNumber: 13
      }
    }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
      strokeDasharray: "10 10",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 197,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
      dataKey: "date",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 198,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
      yAxisId: "left",
      dataKey: "price",
      domain: [Math.round(minPrice * 0.99), Math.round(maxPrice * 1.01)],
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 199,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
      yAxisId: "right",
      orientation: "right",
      dataKey: "poolAmount",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 204,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 205,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 206,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
      isAnimationActive: false,
      strokeWidth: 0,
      yAxisId: "right",
      dataKey: "poolAmount",
      name: "Pool",
      dot: false,
      fill: "#627EEA",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 207,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
      isAnimationActive: false,
      yAxisId: "left",
      dataKey: "price",
      name: "Chainlink Price",
      dot: false,
      stroke: "#666",
      strokeWidth: 2,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 208,
        columnNumber: 15
      }
    }))));
  }), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 214,
      columnNumber: 7
    }
  }, "Liquidated Collateral"), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
    width: "100%",
    height: 600,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 215,
      columnNumber: 7
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ComposedChart"], {
    data: liquidationsChartData,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 216,
      columnNumber: 9
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 219,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
    dataKey: "date",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 220,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
    dataKey: "collateral",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    isAnimationActive: false,
    stackId: "a",
    dataKey: "long",
    name: "Long",
    dot: false,
    strokeWidth: 0,
    stroke: "purple",
    fill: "purple",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    isAnimationActive: false,
    stackId: "a",
    dataKey: "short",
    name: "Short",
    dot: false,
    stroke: "green",
    strokeWidth: 0,
    fill: "green",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
    isAnimationActive: false,
    dataKey: "collateral",
    name: "All",
    dot: false,
    stroke: "black",
    strokeWidth: 2,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226,
      columnNumber: 11
    }
  }))), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 7
    }
  }, "Global PnL"), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
    width: "100%",
    height: 600,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 7
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ComposedChart"], {
    data: pnlChartData,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 232,
      columnNumber: 9
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
    dataKey: "date",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
    domain: [pnlMin * 1.5, pnlMax * 0.50],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    isAnimationActive: false,
    dataKey: "profits",
    name: "Profits",
    dot: false,
    strokeWidth: 0,
    fill: "lightblue",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    isAnimationActive: false,
    dataKey: "loss",
    name: "Loss",
    dot: false,
    stroke: "pink",
    strokeWidth: 0,
    fill: "pink",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
    isAnimationActive: false,
    dataKey: "net",
    name: "Net",
    dot: false,
    stroke: "#000",
    strokeWidth: 2,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
    isAnimationActive: false,
    dataKey: "long",
    name: "Longs Net",
    dot: false,
    stroke: "green",
    strokeWidth: 1,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
    isAnimationActive: false,
    dataKey: "short",
    name: "Shorts Net",
    dot: false,
    stroke: "red",
    strokeWidth: 1,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 11
    }
  }))), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 7
    }
  }, "Fees"), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
    width: "100%",
    height: 600,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 249,
      columnNumber: 7
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ComposedChart"], {
    syncId: "syncId",
    data: feesChartData,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250,
      columnNumber: 9
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 251,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
    dataKey: "date",
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 252,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
    dataKey: "all",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 253,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 254,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    type: "monotone",
    dot: false,
    dataKey: "swap",
    stackId: "a",
    name: "Swap",
    stroke: "#FE88B1",
    fill: "#FE88B1",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    type: "monotone",
    dot: false,
    dataKey: "mint",
    stackId: "a",
    name: "Mint USDG",
    stroke: "#C9DB74",
    fill: "#C9DB74",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    type: "monotone",
    dot: false,
    dataKey: "burn",
    stackId: "a",
    name: "Burn USDG",
    stroke: "#ab6100",
    fill: "#ab6100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    type: "monotone",
    dot: false,
    dataKey: "liquidation",
    stackId: "a",
    name: "Liquidation",
    stroke: "#c90000",
    fill: "#c90000",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 259,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    type: "monotone",
    dot: false,
    dataKey: "margin",
    stackId: "a",
    name: "Margin trading",
    stroke: "#5D69B1",
    fill: "#5D69B1",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 260,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
    isAnimationActive: false,
    dot: false,
    dataKey: "all",
    name: "Total",
    stroke: "#000",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 11
    }
  }))), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 7
    }
  }, "Swap volumes by recipient"), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
    width: "100%",
    height: 600,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 7
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["LineChart"], {
    syncId: "syncId",
    data: swapSourcesChartData,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 267,
      columnNumber: 9
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 268,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
    dataKey: "date",
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 269,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
    dataKey: "all",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 270,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 272,
      columnNumber: 11
    }
  }), swapSourcesFilteredKeys.map((key, i) => {
    return __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
      dataKey: key,
      dot: false,
      stroke: COLORS[i % COLORS.length],
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 274,
        columnNumber: 20
      }
    });
  }))));
}
/* harmony default export */ __webpack_exports__["default"] = (Trading);

/***/ }),

/***/ 0:
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./node_modules/razzle-dev-utils/prettyNodeErrors.js (webpack)/hot/poll.js?300 ./src !./node_modules/razzle-start-server-webpack-plugin/dist/monitor-loader.js!./node_modules/razzle-start-server-webpack-plugin/dist/monitor-loader.js ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\jalve\Documents\GitHub\chimpy-frontend\anzor-trade-stats\node_modules\razzle-dev-utils\prettyNodeErrors.js */"./node_modules/razzle-dev-utils/prettyNodeErrors.js");
__webpack_require__(/*! C:\Users\jalve\Documents\GitHub\chimpy-frontend\anzor-trade-stats\node_modules\webpack\hot\poll.js?300 */"./node_modules/webpack/hot/poll.js?300");
__webpack_require__(/*! C:\Users\jalve\Documents\GitHub\chimpy-frontend\anzor-trade-stats\src */"./src/index.js");
module.exports = __webpack_require__(/*! !!C:\Users\jalve\Documents\GitHub\chimpy-frontend\anzor-trade-stats\node_modules\razzle-start-server-webpack-plugin\dist\monitor-loader.js!C:\Users\jalve\Documents\GitHub\chimpy-frontend\anzor-trade-stats\node_modules\razzle-start-server-webpack-plugin\dist\monitor-loader.js */"./node_modules/razzle-start-server-webpack-plugin/dist/monitor-loader.js!./node_modules/razzle-start-server-webpack-plugin/dist/monitor-loader.js");


/***/ }),

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@apollo/client");

/***/ }),

/***/ "@babel/code-frame":
/*!************************************!*\
  !*** external "@babel/code-frame" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/code-frame");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "console-log-level":
/*!************************************!*\
  !*** external "console-log-level" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("console-log-level");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "cross-fetch":
/*!******************************!*\
  !*** external "cross-fetch" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cross-fetch");

/***/ }),

/***/ "ethers":
/*!*************************!*\
  !*** external "ethers" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ethers");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "framer-motion":
/*!********************************!*\
  !*** external "framer-motion" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("framer-motion");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jest-message-util":
/*!************************************!*\
  !*** external "jest-message-util" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jest-message-util");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "object-sizeof":
/*!********************************!*\
  !*** external "object-sizeof" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("object-sizeof");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-icons/fa":
/*!*********************************!*\
  !*** external "react-icons/fa" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/fa");

/***/ }),

/***/ "react-icons/fi":
/*!*********************************!*\
  !*** external "react-icons/fi" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/fi");

/***/ }),

/***/ "react-icons/ri":
/*!*********************************!*\
  !*** external "react-icons/ri" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-icons/ri");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "recharts":
/*!***************************!*\
  !*** external "recharts" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("recharts");

/***/ }),

/***/ "strftime":
/*!***************************!*\
  !*** external "strftime" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("strftime");

/***/ }),

/***/ "webpack/hot/log-apply-result":
/*!***********************************************!*\
  !*** external "webpack/hot/log-apply-result" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack/hot/log-apply-result");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map