import { Injectable } from '@angular/core';

interface TreeNode<T> {
    data: T;
    children?: TreeNode<T>[];
    expanded?: boolean;
}

interface FSEntry {
    name: string;
    editable: string;
    val: string;
    items?: number;
}

interface MenuField {
    name: string;
    val: string;
    editable: boolean;
    dataType?: string;
    kind: string;
}

interface GroupMember {
    member_id: number,
    member_name: string,
    group_member_id: number,
    member_guid: string,
    group_guid_parent: string,
    cd_obj_type_id: number,
    kind: string;
}

interface Node {
    data: GroupMember;
    children?: GroupMember[];
}

@Injectable({
    providedIn: 'root'
})
export class TreeHelperService {

    constructor() { }

    corrugate(data: any) {
        let root = '';
        return data.reduce((t: any, o: any) => {
            o.id === o.pid && (root = o.id);
            t[o.id] ? t[o.id].name = o.name
                : t[o.id] = { id: o.id, name: o.name };
            t[o.pid] ? o.pid !== o.id ? t[o.pid].children.push(t[o.id])
                : t[o.pid].children = t[o.pid].children || []
                : t[o.pid] = { id: o.pid, children: [t[o.id]] };
            return t;
        }, {})[root];
    }

    unflatten(arr: any) {
        var tree = [],
            mappedArr: any = {},
            arrElem,
            mappedElem;

        // First map the nodes of the array to an object -> create a hash table.
        for (var i = 0, len = arr.length; i < len; i++) {
            arrElem = arr[i];
            mappedArr[arrElem.id] = arrElem;
            mappedArr[arrElem.id]['children'] = [];
        }


        for (var id in mappedArr) {
            if (mappedArr.hasOwnProperty(id)) {
                mappedElem = mappedArr[id];
                // If the element is not at the root level, add it to its parent array of children.
                if (mappedElem.parentid) {
                    mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
                }
                // If the element is at the root level, add it to first level elements array.
                else {
                    tree.push(mappedElem);
                }
            }
        }
        return tree;
    }

    /////////////////////////
    findParent(arr: any, diagId: any) {
        return arr.find((parent: any) => parent.DIAGID === diagId);
    }

    createTreeNode(value: any) {
        return {
            label: value.DIAGNOSIS,
            value: value.DIAGID,
            children: (value.children !== undefined)
                ? value.children.map(this.createTreeNode)
                : undefined
        };
    }

    createTree(data: any) {
        return data
            // first restructure existing nodes as a tree
            .reduce((result: any, value: any, index: any, originalArray: any) => {
                if (value.PARENTID !== null) {
                    const parent = this.findParent(originalArray, value.PARENTID);

                    if (parent) {
                        // add as child if has parent
                        parent.children = (parent.children || []).concat(value);
                    }

                    return result;
                } else {
                    // Add value to top level of the result array
                    return result.concat(value);
                }
            }, [] /* Initialize with empty result array */)
            // them map to new data type
            .map(this.createTreeNode);
    }

    setTree(flatData: any) {
        function findParent(arr: any, diagId: any) {
            return arr.find((parent: any) => parent.DIAGID === diagId);
        }

        function createTreeNode(value: any) {
            return {
                label: value.DIAGNOSIS,
                value: value.DIAGID,
                children: (value.children !== undefined)
                    ? value.children.map(createTreeNode)
                    : undefined
            };
        }

        function createTree(data: any) {
            return data
                // first restructure existing nodes as a tree
                .reduce((result: any, value: any, index: any, originalArray: any) => {
                    if (value.PARENTID !== null) {
                        const parent = findParent(originalArray, value.PARENTID);

                        if (parent) {
                            // add as child if has parent
                            parent.children = (parent.children || []).concat(value);
                        }

                        return result;
                    } else {
                        // Add value to top level of the result array
                        return result.concat(value);
                    }
                }, [] /* Initialize with empty result array */)
                // them map to new data type
                .map(createTreeNode);
        }

        const tree = createTree(flatData);
        console.log(tree);
        return tree;
    }
    /////////////////////////

    /**
     * Convert the data format of JSON arrays such as id and parentId to tree node format
   * @param {Array} arr
   * @param {String} id
   * @param {String} pid
   * @return {Array}
   */
    arrayToTree(arr: any, id: any, pid: any) {
        let data = JSON.parse(JSON.stringify(arr));
        if (!data || !data.length) return [];
        let targetData = []; // container for storing data (return)
        let records: any= {};
        let itemLength = data.length; //Number of data collections
        for (let i = 0; i < itemLength; i++) {
            let o = data[i];
            records[o[id]] = o;
        }
        for (let i = 0; i < itemLength; i++) {
            let currentData = data[i];
            let parentData = records[currentData[pid]];
            if (!parentData) {
                targetData.push(currentData);
                continue;
            }
            parentData.children = parentData.children || [];
            parentData.children.push(currentData);
        }
        return targetData;
    }

    // arrayToTreeV2(arr: GroupMember[], id: any, pid: any) {
    //     let d: GroupMember[] = JSON.parse(JSON.stringify(arr));
    //     if (!d || !d.length) return [];
    //     let targetData = []; // container for storing data (return)
    //     let records: any = {};
    //     let itemLength = d.length; //Number of data collections
    //     for (let i = 0; i < itemLength; i++) {
    //         let o: any = d[i];
    //         records[o[id]] = o;
    //     }
    //     for (let i = 0; i < itemLength; i++) {
    //         let currentData: Node = { data: d[i] };
    //         let parentData = records[currentData.data[pid]];
    //         if (!parentData) {
    //             console.log('currentData:', currentData);
    //             if ('children' in currentData) {
    //                 console.log('is ok');
    //             } else {
    //                 if ('children' in currentData.data) {
    //                     // move currentData.data.children to currentData.children
    //                     currentData.children = currentData.data['children'];
    //                     delete currentData.data['children'];
    //                 }
    //             }
    //             targetData.push(currentData);
    //             continue;
    //         }
    //         console.log('parentData:', parentData);
    //         delete parentData.cd_obj_type_id;
    //         delete parentData.group_guid_parent;
    //         delete parentData.group_member_id;
    //         delete parentData.member_guid;
    //         delete parentData.member_name;
    //         parentData.children = parentData.children || [];
    //         parentData.data = parentData;
    //         parentData.children.push(currentData);
    //     }

    //     targetData = targetData.filter((g: any) => {
    //         if ('children' in g) {
    //             return g;
    //         }
    //     });
    //     return targetData;
    // }

    /**
   * Convert an array to tree structure data
   *
   * @export
   * @param {Array} array
     * @param {Object} parent parent node
   * @param {Array} tree
   * @return {Array}
   */
    array2tree(array: any, parent: any = { id: 0 }, tree = []) {
        let treeData = tree
        const t = this;
        const children = array.filter(array, function (child: any) {
            return child.parentId === parent.id
        })
        if (!array.isEmpty(children)) {
            if (parent.id === 0) {
                treeData = children
            } else {
                parent['children'] = children
            }
            array.each(children, function (child: any) {
                t.array2tree(array, child)
            })
        }
        return treeData
    }

    /**
     * get group members from db and strictire them into hierarchy of the form { data: g, children: []}
     * - this is usefull for tree-grid used in nebular
     * @param groups 
     */
    getRoot(groups: GroupMember[]) {
        console.log('getRoot(groups: GroupMember[])/groups:', groups);
        let ret = groups.filter((g: any) => {
            if (g.cd_obj_type_id == 17) {
                return g;
            }
        });

        let root = ret.map((g) => {
            return { data: g, children: [] };
        });

        root.forEach((parent, i) => {
            root[i].children = this.getChildren(parent, groups);
        });
        console.log('getRoot(groups: GroupMember[])/root:', root);
        return root;
    }

    getChildren(parent: Node, groups: GroupMember[]): any {
        // if(parent.data.member_guid == '645730F0-3'){
        //     console.log('parent:', parent);
        // }
        
        /**
         * filter children from the group
         */
        let children: any = groups.filter((g: any) => {
            // console.log('getChildren/:parent', parent);
            if (g.group_guid_parent == parent.data.member_guid) {
                return g;
            }
        })
            /**
             * map the result into nodes
             */
            .map((g) => {
                return { data: g, children: [] };
            });

        

        /**
         * return with grand children if it hasChildren
         */
        return children.map((g: Node) => {
            let member = g;

            /**
             * check if member hasChildren, 
             */
            let hasChildren = groups.filter((g: any) => {
                if (g.group_guid_parent == member.data.member_guid) {
                    return g;
                }
            });
            if (hasChildren.length > 0) {
                /**
                 * if hasChildren, dig deeper for grandchildren 
                 */
                
                let ret = this.getChildren(g, groups);
                g['children'] = ret;
                return g;
            } else {
                /**
                 * if hasChildren is negative, then return as is
                 */
                return g;
            }

        });
    }

    ///////////////////////
    toTree(dataSource: any, idField: any, pField: any) {
        let ret = dataSource.filter((row: any) => {
            if (row.cd_obj_type_id == 17) {
                return row;
            }
        });

        let root = ret.map((row: any) => {
            row['children'] = [];
            return row;
        });

        // console.log('root:', root);

        root.forEach((parentNode: any, i: any) => {
            root[i].children = this.getDecendants(parentNode, dataSource, idField, pField);
        });
        console.log(JSON.stringify(root[4]));
        return root;
    }

    getDecendants(parentNode: any, dataSource: any, idField: any, pField: any): any {
        if (parentNode[idField] == '5B54F277-B') {
            // console.log('getDecendants/parentNode:', parentNode);
        }
        /**
         * search for children to parentNode
         */
        let children: any = dataSource.filter((row: any) => {
            if (row[pField] == parentNode[idField]) {
                return row;
            }
        })
            /**
             * map the result into nodes
             */
            .map((row: any) => {
                row['children'] = [];
                return row;
            });

        if (parentNode[idField] == '5B54F277-B') {
            // console.log('getDecendants/children:', children);
        }

        /**
         * return with grand children if it hasChildren
         */
        return children.map((c: any, i: any) => {
            /**
             * check if member hasChildren, 
             */
            let hasChildren = dataSource.filter((row: any) => {
                if (row[pField] == c[idField]) {
                    return row;
                }
            });
            // console.log('getDecendants/c:', c);
            // console.log('getDecendants/hasChildren:', hasChildren);
            if (hasChildren.length > 0) {
                /**
                 * if hasChildren, dig deeper for grandchildren 
                 */
                let ret = this.getDecendants(c, dataSource, idField, pField);
                c['children'] = ret;
                return c;

            } else {
                /**
                 * if hasChildren is negative, then return as is
                 */
                return c;
            }

        });
    }

}