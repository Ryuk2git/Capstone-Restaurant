import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { MenuItemService } from '../../shared/services/menu-item.service';
import { OrderService } from '../../shared/services/order.service';
import { AuthService } from '../../shared/services/auth.service';

interface CartEntry {
  menuItem: MenuItem;
  qty: number;
}

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnChanges {

  @Input() restaurantId!: number;
  @Input() restaurantName = '';
  @Input() canManage = false;
  @Input() isCustomerUser = false;

  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];

  searchText = '';
  loading = false;
  errorMessage = '';

  // Form state
  showForm = false;
  isEditMode = false;
  currentItem: any = this.emptyItem();

  // Cart state (customer)
  cart: CartEntry[] = [];
  placingOrder = false;
  orderSuccess = '';
  orderError = '';

  constructor(
    private menuItemService: MenuItemService,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurantId'] && this.restaurantId) {
      this.closeForm();
      this.searchText = '';
      this.cart = [];
      this.orderSuccess = '';
      this.orderError = '';
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
        this.filterMenuItems();
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
      this.normalize(i?.menuType).includes(k)
    );
  }

  // ===== FORM =====
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
      !this.currentItem.menuType?.trim() ||
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
        next: () => { this.loadMenuItems(); this.closeForm(); },
        error: (err) => { console.error(err); this.errorMessage = 'Failed to update menu item.'; }
      });
    } else {
      delete payload.id; // ensure it's treated as new
      this.menuItemService.addMenuItem(payload).subscribe({
        next: () => { this.loadMenuItems(); this.closeForm(); },
        error: (err) => { console.error(err); this.errorMessage = 'Failed to add menu item.'; }
      });
    }
  }

  deleteMenuItem(id: number): void {
    if (!this.canManage) return;
    if (!confirm('Delete this menu item?')) return;
    this.menuItemService.deleteMenuItem(id).subscribe({
      next: () => {
        this.menuItems = this.menuItems.filter(m => m.id !== id);
        this.filterMenuItems();
      },
      error: (err) => { console.error(err); this.errorMessage = 'Failed to delete menu item.'; }
    });
  }

  // ===== CART =====
  addToCart(item: MenuItem): void {
    const entry = this.cart.find(c => c.menuItem.id === item.id);
    if (entry) {
      entry.qty++;
    } else {
      this.cart.push({ menuItem: item, qty: 1 });
    }
  }

  decreaseQty(item: MenuItem): void {
    const idx = this.cart.findIndex(c => c.menuItem.id === item.id);
    if (idx === -1) return;
    if (this.cart[idx].qty > 1) {
      this.cart[idx].qty--;
    } else {
      this.cart.splice(idx, 1);
    }
  }

  removeFromCart(item: MenuItem): void {
    this.cart = this.cart.filter(c => c.menuItem.id !== item.id);
  }

  isInCart(itemId: number): boolean {
    return this.cart.some(c => c.menuItem.id === itemId);
  }

  getCartQty(itemId: number): number {
    return this.cart.find(c => c.menuItem.id === itemId)?.qty ?? 0;
  }

  getTotal(): number {
    return this.cart.reduce((sum, c) => sum + c.menuItem.price * c.qty, 0);
  }

  placeOrder(): void {
    if (this.cart.length === 0) return;
    this.placingOrder = true;
    this.orderSuccess = '';
    this.orderError = '';

    const currentUser = this.authService.getCurrentUser();
    const payload: any = {
      customerName: currentUser?.username,
      orderTime: new Date().toISOString(),
      status: 'PENDING',
      totalAmount: this.getTotal(),
      restaurant: { id: this.restaurantId },
      user: { id: currentUser?.id },
      items: this.cart.map(c => ({ menuItemId: c.menuItem.id, quantity: c.qty, price: c.menuItem.price }))
    };

    this.orderService.addOrder(payload).subscribe({
      next: () => {
        this.placingOrder = false;
        this.orderSuccess = '✅ Order placed! Total: ₹' + this.getTotal();
        this.cart = [];
        setTimeout(() => this.orderSuccess = '', 5000);
      },
      error: (err) => {
        console.error(err);
        this.placingOrder = false;
        this.orderError = 'Failed to place order. Please try again.';
      }
    });
  }

  // ===== UTILS =====
  trackById(index: number, item: any): number { return item.id; }

  private normalize(v: any): string {
    return String(v ?? '').trim().toLowerCase();
  }

  private emptyItem(): any {
    return { id: 0, name: '', menuType: '', quantity: 0, price: 0, description: '' };
  }
}