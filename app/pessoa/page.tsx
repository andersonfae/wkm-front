"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Estado {
  id: number;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

const AddPessoa = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<number | null>(
    null
  );
  const [cidadeSelecionada, setCidadeSelecionada] = useState<number | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/estados`
        );
        const data = await response.json();

        if (data && data.data) {
          const estadosComNome = data.data.map((estado: any) => ({
            id: estado.id,
            nome: estado.Nome,
          }));
          setEstados(estadosComNome);
        } else {
          console.error(
            "Os dados recebidos não têm a propriedade 'data':",
            data
          );
        }
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
      }
    };

    fetchEstados();
  }, []);

  useEffect(() => {
    const fetchCidades = async () => {
      if (estadoSelecionado) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cidades?estado=${estadoSelecionado}`
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro ao buscar cidades:", errorData);
            setCidades([]);
            return;
          }

          const data = await response.json();
          if (data && data.data) {
            const cidadesComNome = data.data.map((cidade: any) => ({
              id: cidade.id,
              nome: cidade.Nome,
            }));
            setCidades(cidadesComNome);
          } else {
            console.error(
              "Os dados recebidos não têm a propriedade 'data':",
              data
            );
            setCidades([]);
          }
        } catch (error) {
          console.error("Erro ao buscar cidades:", error);
        }
      }
    };

    fetchCidades();
  }, [estadoSelecionado]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    if (!nome || nome.length > 250) {
      toast.error("O Nome é obrigatório e deve ter no máximo 250 caracteres.");
      return;
    }

    if (!nome || !email || !estadoSelecionado || !cidadeSelecionada) {
      toast.error("Todos os campos são obrigatórios");
      return;
    }

    const isEmailUnique = await checkEmailUnique(email);
    if (!isEmailUnique) {
      toast.error("O email já está em uso.");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pessoas`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            Nome: nome,
            Email: email,
            Cidade: { id: cidadeSelecionada },
            Estado: { id: estadoSelecionado },
          },
        }),
      }
    );

    if (response.ok) {
      const pessoa = await response.json();
      setNome("");
      setEmail("");
      setEstadoSelecionado(null);
      setCidadeSelecionada(null);
      toast.success("Pessoa criada com sucesso!");
      window.location.href = `/pessoa/${pessoa.data.documentId}`;
    } else {
      const errorData = await response.json();
      console.error("Erro ao cadastrar pessoa:", errorData);
      setErrorMessage("Erro ao cadastrar pessoa");
      toast.error("Erro ao cadastrar pessoa");
    }
  };

  const checkEmailUnique = async (email: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pessoas?filters[Email][$eq]=${email}`
    );
    const data = await response.json();
    return data.data.length === 0;
  };

  return (
    <>
      <div className="bg-indigo-50 min-h-screen flex items-center justify-center">
        <ToastContainer />
        <div className="isolate rounded-[20px] bg-white px-6 py-8 sm:py-12 lg:px-8 w-11/12 lg:w-fit">
          <img
            src="/wkm_img.png"
            alt="Imagem de cabeçalho"
            className="w-62 h-62 object-cover mb-10"
          />
          <div className="mx-auto sr-only max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Formulário de Contato
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Preencha os campos abaixo e entraremos em contato o mais breve
              possível.
            </p>
          </div>

          {errorMessage && <p className="text-red-600">{errorMessage}</p>}

          <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="nome"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  placeholder="Seu Nome"
                  maxLength={250}
                  className="block outline-none w-full bg-white rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="email@gmail.com"
                  className="block outline-none w-full bg-white rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label
                  htmlFor="estado"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={estadoSelecionado ?? ""}
                  onChange={(e) => setEstadoSelecionado(Number(e.target.value))}
                  required
                  className="block outline-none w-full bg-white rounded-md border-0 px-3.5 py-2.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Selecione um estado</option>
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="cidade"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Cidade
                </label>
                <select
                  id="cidade"
                  name="cidade"
                  value={cidadeSelecionada ?? ""}
                  onChange={(e) => setCidadeSelecionada(Number(e.target.value))}
                  required
                  className="block outline-none w-full bg-white rounded-md border-0 px-3.5 py-2.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Selecione uma cidade</option>
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.id}>
                      {cidade.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPessoa;
