import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

let toastMixin;
if (import.meta.client) {
  toastMixin = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: '!text-[0.875rem] !py-3 !px-4 !w-auto !min-h-0',
      title: '!leading-none',
      icon: 'scale-70',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
}

export const $swal = {
  success(title, text, options) {
    if (import.meta.client) {
      return Swal.fire({
        icon: 'success',
        title,
        text,
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          confirmButton: 'bg-primary text-white border-none outline-none px-6 py-2 rounded-md hover:bg-primary/90 transition-all mx-2',
        },
        buttonsStyling: false,
        ...options
      })
    }
  },
  error(title, text, options) {
    if (import.meta.client) {
      return Swal.fire({
        icon: 'error',
        title,
        text,
        customClass: {
          confirmButton: 'bg-primary text-white border-none outline-none px-6 py-2 rounded-md hover:bg-primary/90 transition-all mx-2',
        },
        buttonsStyling: false,
        ...options
      })
    }
  },
  warning(title, text, options) {
    if (import.meta.client) {
      return Swal.fire({
        icon: 'warning',
        title,
        text,
        customClass: {
          confirmButton: 'bg-primary text-white border-none outline-none px-6 py-2 rounded-md hover:bg-primary/90 transition-all mx-2',
        },
        buttonsStyling: false,
        ...options
      })
    }
  },
  confirm(title, text, options) {
    if (import.meta.client) {
      return Swal.fire({
        icon: 'question',
        title,
        text,
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        reverseButtons: true,
        customClass: {
          confirmButton: 'bg-primary text-white border-none outline-none px-6 py-2 rounded-md hover:bg-primary/90 transition-all mx-2',
          cancelButton: 'bg-surface-container-high text-on-surface border-none outline-none px-6 py-2 rounded-md hover:bg-surface-dim transition-all mx-2',
        },
        buttonsStyling: false,
        ...options
      })
    }
    return Promise.resolve({ isConfirmed: false })
  },
  fire(options) {
    if (import.meta.client) {
      return Swal.fire({
        customClass: {
          confirmButton: 'bg-primary text-white border-none outline-none px-6 py-2 rounded-md hover:bg-primary/90 transition-all mx-2',
          cancelButton: 'bg-surface-container-high text-on-surface border-none outline-none px-6 py-2 rounded-md hover:bg-surface-dim transition-all mx-2',
        },
        buttonsStyling: false,
        ...options
      })
    }
  },
  toast: {
    success(title, options) {
      if (import.meta.client) {
        return toastMixin.fire({ 
          icon: 'success', 
          title, 
          background: '#10b981',
          color: '#ffffff',
          iconColor: '#ffffff',
          ...options 
        })
      }
    },
    error(title, options) {
      if (import.meta.client) {
        return toastMixin.fire({ 
          icon: 'error', 
          title, 
          background: '#ef4444',
          color: '#ffffff',
          iconColor: '#ffffff',
          ...options 
        })
      }
    },
    warning(title, options) {
      if (import.meta.client) {
        return toastMixin.fire({ 
          icon: 'warning', 
          title, 
          background: '#f59e0b',
          color: '#ffffff',
          iconColor: '#ffffff',
          ...options 
        })
      }
    },
    info(title, options) {
      if (import.meta.client) {
        return toastMixin.fire({ 
          icon: 'info', 
          title, 
          background: '#3b82f6',
          color: '#ffffff',
          iconColor: '#ffffff',
          ...options 
        })
      }
    }
  }
}
