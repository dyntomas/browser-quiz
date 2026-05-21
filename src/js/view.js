export const views = document.querySelectorAll(".view")

export function setView(id, views) {
    for (let view of views) {
        view.style.display = "none";      

      if (view.dataset.id == id) {
        view.style.display = "block";
      }
    }
  }