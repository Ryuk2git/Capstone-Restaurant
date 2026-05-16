import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { MenuItemService } from '../../shared/services/menu-item.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnChanges {

  @Input() restaurantId!: number;
  @Input() restaurantName = '';
  @Input() canManage = false;

  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];

  searchText = '';
  loading = false;
  errorMessage = '';

  showForm = false;
  isEditMode = false;

  currentItem: any = this.emptyItem();

  constructor(private menuItemService: MenuItemService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurantId'] && this.restaurantId) {
      this.closeForm();
      this.searchText = '';
      this.loadMenuItems();
    }
  }

  loadMenuItems(): void {
    this.loading = true;
    this.errorMessage = '';

    this.menuItemService.getAllMenuItems().subscribe({
      next: (data: any[]) => {
        const all = data || [];
        this.menuItems = all.filter(x => x?.restaurant?.id === this.restaurantId);
        this.filteredMenuItems = [...this.menuItems];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load menu items.';
        this.loading = false;
      }
    });
  }

  filterMenuItems(): void {
    const k = this.normalize(this.searchText);

    if (!k) {
      this.filteredMenuItems = [...this.menuItems];
      return;
    }

    this.filteredMenuItems = this.menuItems.filter(i =>
      this.normalize(i?.name).includes(k) ||
      this.normalize(i?.category).includes(k)
    );
  }

  openAddForm(): void {
    if (!this.canManage) return;
    this.showForm = true;
    this.isEditMode = false;
    this.errorMessage = '';
    this.currentItem = this.emptyItem();
  }

  openEditForm(item: any): void {
    if (!this.canManage) return;
    this.showForm = true;
    this.isEditMode = true;
    this.errorMessage = '';
    this.currentItem = { ...item };
  }

  closeForm(): void {
    this.showForm = false;
    this.isEditMode = false;
    this.errorMessage = '';
    this.currentItem = this.emptyItem();
  }

  saveMenuItem(): void {
    if (!this.canManage) return;

    if (!this.currentItem.name?.trim() ||
        !this.currentItem.category?.trim() ||
        this.currentItem.price === null ||
        this.currentItem.price === undefined) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    const payload: any = {
      ...this.currentItem,
      restaurant: { id: this.restaurantId }
    };

    if (this.isEditMode) {
      this.menuItemService.updateMenuItem(payload.id, payload).subscribe({
        next: () => {
          this.loadMenuItems();
          this.closeForm();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to update menu item.';
        }
      });
    } else {
      payload.id = 0;
      this.menuItemService.addMenuItem(payload).subscribe({
        next: () => {
          this.loadMenuItems();
          this.closeForm();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to add menu item.';
        }
      });
    }
  }

  deleteMenuItem(id: number): void {
    if (!this.canManage) return;

    const ok = confirm('Delete this menu item?');
    if (!ok) return;

    this.menuItemService.deleteMenuItem(id).subscribe({
      next: () => {
        this.menuItems = this.menuItems.filter(m => m.id !== id);
        this.filterMenuItems();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to delete menu item.';
      }
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  private normalize(v: any): string {
    return String(v ?? '').trim().toLowerCase();
  }

  private emptyItem(): any {
    return {
      id: 0,
      name: '',
      category: '',
      price: 0,
      description: ''
    };
  }
}