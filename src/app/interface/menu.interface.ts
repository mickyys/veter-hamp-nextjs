export interface Menu {
    icon: string;
    title: string;
    link?: string;
    selected?: boolean;
    type: 'menu' | 'item';
    items?: Menu[];
}