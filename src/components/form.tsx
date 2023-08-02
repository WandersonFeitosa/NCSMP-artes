interface FormProps {
  apiUrl: string;
}

export function Form({ apiUrl }: FormProps) {
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileInput = e.target as HTMLInputElement;
    const thumbnail = document.querySelector(
      ".file__thumbnail"
    ) as HTMLImageElement;
    const file = fileInput.files![0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        thumbnail.src = reader.result as string;
        thumbnail.style.marginTop = "1.5rem";
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = document.querySelector("#sign-image") as HTMLFormElement;
    const formData = new FormData(form);
    const submitButton = document.querySelector(
      ".form__submit"
    ) as HTMLButtonElement;
    const thumbnail = document.querySelector(
      ".file__thumbnail"
    ) as HTMLImageElement;

    submitButton.disabled = true;

    fetch(`${apiUrl}/postImage`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      submitButton.disabled = false;
      if (res.status !== 200) return alert("Erro ao enviar imagem");
      form.reset();
      thumbnail.src = "";
      alert("Imagem enviada com sucesso");
      window.location.reload();
    });
  }

  return (
    <div className="form">
      <div className="container">
        <div className="form__wrapper">
          <div className="form__col">
            <h1>Artes NCSMP</h1>
            <p>
              Envie aqui a sua arte para termos ela guardada em um lugar
              especial e termos uma maneira fácil de expor elas.
            </p>
            <p>
              Sinta-se livre pra escrever os nomes e nicks da maneira que as
              pessoas se referem.
            </p>
            <p>NÃO USE SENHAS IMPORTANTES PRA VOCÊ, USA QUALQUER COISA BOBA</p>
          </div>
          <div className="form__col">
            <form id="sign-image" onSubmit={handleFormSubmit}>
              <input type="text" name="name" placeholder="Seu nick" required />
              <input
                type="text"
                name="author"
                placeholder="Autor da Imagem"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Título da imagem"
                required
              />
              <input
                type="text"
                name="password"
                placeholder="Senha para apagar a imagem"
                required
              />
              <div className="form__image-input-wrapper">
                <label className="form__image-input-label">
                  <span className="form__image-input-text">
                    Selecione a sua imagem
                  </span>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </label>
                <img className="file__thumbnail" />
              </div>
              <button type="submit" className="form__submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
