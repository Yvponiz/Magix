window.addEventListener("load", () => {
	let path = window.location.pathname;
	let page = path.split("/").pop();

	if (page === "lobby.php"){
		document.querySelector(".lobby-deck-btn").addEventListener("click", () => {
			document.querySelector(".deck-manager").style.display = "flex";
		});
		document.querySelector(".deck-manager-close").addEventListener("click", () => {
			document.querySelector(".deck-manager").style.display = "none";
		});
	}
});

const applyStyles = iframe => {
	let styles = {
		fontColor : "white",
		backgroundColor : "rgba(36, 102, 50, 0.700)",
		fontGoogleName : "Helvetica",
		fontSize : "1em",
		hideIcons : false,
		inputBackgroundColor : "rgba(0, 0, 0, 0)",
		inputFontColor : "white"
	}

	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
	}, 1000);
};

function deleteNote(id) {
    let formData = new FormData();
    formData.append("id", id);
  
    fetch("notes.php", {
      method: "POST",
      credentials: "include",
      body: formData
    })
    .then(response => response.json())
}	


