const Toast = {
    template: `
    <div :class="['c-toasts__item', 'c-toasts__item--' + type]" >
      <span class="c-toasts__item-text">{{ text }}</span>
    </div>`,
    data() {
        return {
            toasts: [],
            toastID: 0,
            states: ['success', 'danger', 'warning', 'info'],
            text: '',
            type: '',
        }
    },
    methods: {
        addToast ({ text, type = 'info', duration = 4000 }) {
            const id = this.toastID++;

            this.text = text,

            
            this.toasts.push({ id, type, text });
            
            setTimeout(() => {
              this.removeToast(id)
            }, duration);
        },
        removeToast (id) {
            this.toasts = this.toasts.filter(m => m.id !== id);
        }
    }
}