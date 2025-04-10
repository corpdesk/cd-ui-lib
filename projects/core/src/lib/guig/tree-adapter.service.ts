// cd-tree-adapter.service.ts

import { Injectable } from '@angular/core';
import { TreeItem, CdTreeConfig, TreeMapping } from './models/guig-tree.model';

@Injectable({
  providedIn: 'root',
})
export class TreeAdapterService {

  // Method to adapt the input data to a tree structure
  public adaptToTree(data: any[], config: CdTreeConfig): TreeItem[] {
    if (config.recursive) {
      return this.buildRecursiveTree(data, config.maps[0]);
    } else {
      return this.buildNonRecursiveTree(data, config.maps);
    }
  }

  // Method for recursive tree
  private buildRecursiveTree(data: any[], map: TreeMapping): TreeItem[] {
    return data.map(item => this.mapToTreeItem(item, map, true));
  }

  // Method for non-recursive tree
  private buildNonRecursiveTree(data: any[], maps: TreeMapping[]): TreeItem[] {
    let currentLevelData = data;
    let result: TreeItem[] = [];
    maps.forEach((map, index) => {
      currentLevelData.forEach(item => {
        const treeItem = this.mapToTreeItem(item, map, false);
        if (index < maps.length - 1) {
          treeItem.subItems = this.buildNonRecursiveTree(item[maps[index + 1].subItems], maps.slice(index + 1));
        }
        result.push(treeItem);
      });
      currentLevelData = result;
    });

    return result;
  }

  // Mapping method
  private mapToTreeItem(item: any, map: TreeMapping, recursive: boolean): TreeItem {
    const treeItem: TreeItem = {
      id: item[map.id],
      label: item[map.label],
      icon: map.icon ? item[map.icon] : null,
      link: map.link ? item[map.link] : null,
      subItems: recursive && map.subItems ? this.buildRecursiveTree(item[map.subItems], map) : null,
      isTitle: map.isTitle ? item[map.isTitle] : false,
      badge: map.badge ? item[map.badge] : null,
      parentId: item[map.parentId],
      isLayout: map.isLayout ? item[map.isLayout] : false,
      moduleIsPublic: map.moduleIsPublic ? item[map.moduleIsPublic] : false
    };
    return treeItem;
  }
}
