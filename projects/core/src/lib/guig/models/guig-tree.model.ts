// cd-tree.model.ts

export interface TreeItem {
    id?: number;
    label?: string;
    icon?: string; 
    link?: string; 
    subItems?: any; 
    isTitle?: boolean;
    badge?: any;
    parentId?: number; 
    isLayout?: boolean; 
    moduleIsPublic?: boolean;
}

export interface TreeMapping {
    id: string;
    label: string;
    icon?: string;
    link?: string;
    subItems?: string;
    isTitle?: string;
    badge?: string;
    parentId: string;
    isLayout?: string;
    moduleIsPublic?: string;
}

export interface CdTreeConfig {
    // inputInterface: any; // Type of input data interface
    recursive: boolean; // Flag to determine if the tree is recursive
    maps: TreeMapping[]; // Mapping configuration for different levels
}
