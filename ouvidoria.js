var notaAtendimento = 3;
var notaSolucao = 3;
var documento = 0;
var protocolo = 0;
$(".ddd").mask("00", { reverse: true });
$(".telefonePF").mask("9 0000-0000", { reverse: true });
$(".telefonePJ").mask("9 0000-0000", { reverse: true });
$(".cpf").mask("000.000.000-00", { reverse: true });
$(".cnpj").mask("00.000.000/0000-00", { reverse: true });
$("h1")[0].remove();
$(document).ready(function () {
  $(".modal").modal();
  $("select").formSelect();
});
$(document).ready(function () {
  $("#selectPesquisar").change(function () {
    switch ($(this).val()) {
      case "AN":
        $(".documento").slideUp();
        $(".documento").empty();
        $("#selectPesquisar").parents(".input-field").removeClass("m4");
        $("#selectPesquisar")
          .parents(".input-field")
          .addClass("m12")
          .slideDown();
        break;
      case "PF":
        $(".documento").empty();
        $("#selectPesquisar").parents(".input-field").removeClass("m12");
        $("#selectPesquisar").parents(".input-field").addClass("m4");
        $("#DOCUMENTO").mask("000.000.000-00", { reverse: true });
        $(".documento")
          .append(
            '<input id="DOCUMENTO" name="documento" type="text" class="validate" required/><label for="DOCUMENTO">CPF Utilizado na Manifestação</label>'
          )
          .slideDown("slow");
        break;
      case "PJ":
        $(".documento").empty();
        $("#selectPesquisar").parents(".input-field").removeClass("m12");
        $("#selectPesquisar").parents(".input-field").addClass("m4");
        $("#DOCUMENTO").mask("00.000.000/0000-00", { reverse: true });
        $(".documento")
          .append(
            '<input id="DOCUMENTO" name="documento" type="text" class="validate" required/><label for="DOCUMENTO">CNPJ Utilizado na Manifestação</label>'
          )
          .slideDown("slow");
        break;
    }
  });
});
function novaMovimentacao() {
  $(".encerrarManifestacao").hide();
  $(".novaMovimentacao").show();
}
function encerrarManifestacao() {
  console.log("encerrarMovimentação");
  $(".novaMovimentacao").hide();
  $(".encerrarManifestacao").show();
}
function trocaEstrelaAtendimento(estrela) {
  notaAtendimento = $(estrela).data("atendimento");
  if ($(estrela).html() == "star_border") {
    $(estrela).html("star");
    $(estrela).prevAll().html("star");
    $(estrela).nextAll().html("star_border");
  } else {
    $(estrela).html("star_border");
    $(estrela).siblings().html("star_border");
    notaAtendimento = 3;
  }
}
function trocaEstrelaSolucao(estrela) {
  notaSolucao = $(estrela).data("solucao");
  if ($(estrela).html() == "star_border") {
    $(estrela).html("star");
    $(estrela).prevAll().html("star");
    $(estrela).nextAll().html("star_border");
  } else {
    $(estrela).html("star_border");
    $(estrela).siblings().html("star_border");
    notaSolucao = 3;
  }
}
$(document).ready(function () {
  $("#formAnonimo").submit(function (e) {
    e.preventDefault();
    $("#formAnonimo").toggle();
    $(".loaderAnonimo").toggle();
    var data = new FormData($("#formAnonimo")[0]);
    setTimeout(function () {
      $.ajax({
        type: "POST",
        url: "https://caubr.aloatendimento.com.br/api/alo/cadastrar",
        data: data,
        processData: false,
        contentType: false,
        success: function (response) {
          console.log(response);
          $(".loaderAnonimo").toggle();
          $(".sucessoAnonimo").append(
            `<span>${response.protocolo}</span><p style="padding: 5px;background: red;color: white;">Guarde o Número deste protocolo. Sem ele não será possível consultar sua manifestação.</p>`
          );
          $(".sucessoAnonimo").toggle();
        },
        error: function (xhr, status, error) {
          console.log(error);
          alert("Ocorreu um Erro. Tente novamente.");
          $("#formAnonimo").toggle();
        },
      });
    }, 3000);
    return false;
  });
});
$(document).ready(function () {
  $("#formPessoaFisica").submit(function (e) {
    e.preventDefault();
    $("#formPessoaFisica").toggle();
    $(".loaderPessoaFisica").toggle();
    $(".cpf").unmask();
    $(".telefonePF").unmask();
    var data = new FormData($("#formPessoaFisica")[0]);
    setTimeout(function () {
      $.ajax({
        type: "POST",
        url: "https://caubr.aloatendimento.com.br/api/alo/cadastrar",
        data: data,
        processData: false,
        contentType: false,
        success: function (response) {
          console.log(response);
          $(".loaderPessoaFisica").toggle();
          $(".sucessoPessoaFisica").append(
            `<span>${response.protocolo}</span><p>Guarde o Número deste protocolo. Sem ele não será possível consultar sua manifestação.</p>`
          );
          $(".sucessoPessoaFisica").toggle();
        },
        error: function (xhr, status, error) {
          alert(xhr.responseText);
        },
      });
    }, 3000);
    return false;
  });
});
$(document).ready(function () {
  $("#formPessoaJuridica").submit(function (e) {
    e.preventDefault();
    $("#formPessoaJuridica").toggle();
    $(".loaderPessoaJuridica").toggle();
    $(".cnpj").unmask();
    $(".telefonePJ").unmask();
    var data = new FormData($("#formPessoaJuridica")[0]);
    setTimeout(function () {
      $.ajax({
        type: "POST",
        url: "https://caubr.aloatendimento.com.br/api/alo/cadastrar",
        data: data,
        processData: false,
        contentType: false,
        success: function (response) {
          console.log(response);
          $(".loaderPessoaJuridica").toggle();
          $(".sucessoPessoaJuridica").append(
            `<span>${response.protocolo}</span><p>Guarde o Número deste protocolo. Sem ele não será possível consultar sua manifestação.</p>`
          );
          $(".sucessoPessoaJuridica").toggle();
        },
        error: function (xhr, status, error) {
          alert(xhr.responseText);
        },
      });
    }, 3000);
    return false;
  });
});
$(document).ready(function () {
  $("#formPesquisarProtocolo").submit(function (e) {
    e.preventDefault();
    $("#formPesquisarProtocolo").toggle();
    $(".loaderPesquisarProtocolo").toggle();
    if ($("#DOCUMENTO").val() != null) {
      $("#DOCUMENTO").unmask();
      var documento = $("#DOCUMENTO").val();
    } else {
      var documento = 0;
    }
    var protocolo = $("#protocolo").val();
    setTimeout(function () {
      $.ajax({
        type: "GET",
        url: `https://caubr.aloatendimento.com.br/api/alo/busca/Y2F1YnIyMDE4?filtro=cadastro&documento=${documento}&protocolo=${protocolo}`,
        success: function (cadastro) {
          if (cadastro == null) {
            alert(
              "CPF/CNPJ ou Número de Protocolo inexistente. Tente novamente com as informações corretas."
            );
            $("#formPesquisarProtocolo").toggle();
            $(".loaderPesquisarProtocolo").toggle();
          }
          var anexoCadastro = "";
          var cont = 1;
          if (cadastro.URL.length > 0) {
            for (i = 0; i < cadastro.URL.length; i++) {
              console.log(cadastro.URL[i].Link);
              anexoCadastro = `${anexoCadastro}<li><a href="${cadastro.URL[i].Link}"> Anexo ${cont}</a>`;
              cont++;
            }
          } else {
            anexoCadastro = "Sem Anexos";
          }
          /*for(i=0; i < cadastro.URL.length; i++){
            console.log(cadastro.URL[i].Link);
            anexoCadastro = anexoCadastro + '<li> <a href="'+ cadastro.URL[i].Link +'"> Anexo '+cont+'</a>';
            cont++;
          }*/
          var nome = cadastro.NOME_CLIENTE;
          console.log(cadastro);
          if (cadastro.CPF != "000.000.000-00") {
            var cpfCadastro = `<tr>
              <td>CPF/CNPJ</td>
              <td>${cadastro.CPF}</td>
              </tr>`;
          }
          switch (cadastro.STATUS) {
            case "P":
              var pendente = "Pendente";
              break;
            case "A":
              var pendente = "Em Análise pelo Backoffice";
              break;
            case "F":
              var pendente = "Encerrada";
              break;
          }
          cadastroObservacao = cadastro.OBSERVACAO.replace(
            /(?:\r\n|\r|\n)/g,
            "<br />"
          );
          $(".loaderPesquisarProtocolo").toggle();
          $(".sucessoPesquisarProtocolo").html(
            `<h4>Pesquisar Protocolo</h4>
              <h5>Informações Cadastrais da Manifestação</h5>
              <table class="striped tablePesquisa responsive-table">
                <tbody>
                  <tr>
                    <td>Protocolo</td>
                    <td>${cadastro.PROTOCOLO}</td>
                  </tr>
                  <tr>
                    <td>Situação</td>
                    <td>${pendente}</td>
                  </tr>
                  <tr>
                    <td>Data da Manifestação</td>
                    <td>${cadastro.DATA_CONTATO}</td>
                  </tr>
                  <tr>
                    <td>Manifestante</td>
                    <td>${cadastro.NOME_CLIENTE}</td>
                  </tr>
                  <tr>
                    <td>Motivo da Manifestação</td>
                    <td>${cadastro.MOTIVO}</td>
                  </tr>
                  <tr>
                    <td>CPF</td>
                    <td>${cpfCadastro}</td>
                  </tr>
                  <tr>
                    <td>Descrição</td>
                    <td>${cadastroObservacao}</td>
                  </tr>
                  <tr>
                    <td>Lista de Anexos</td>
                    <td>
                      <ul>
                        <li>${anexoCadastro}</li>
                      </ul>
                    </td>
                  </tr>
              </tbody>
            </table>`
          );
          $(".sucessoPesquisarProtocolo").toggle();
          $.ajax({
            type: "GET",
            url:
              "https://caubr.aloatendimento.com.br/api/alo/busca/Y2F1YnIyMDE4?filtro=historico&documento=" +
              documento +
              "&protocolo=" +
              protocolo,
            success: function (historico) {
              if (historico.length > 0) {
                $(".sucessoPesquisarProtocolo").append(
                  "<h5>Movimentações</h5>"
                );
              }
              for (i = 0; i < historico.length; i++) {
                var movimento = i + 1;
                var anexoHistorico = "";
                var contHis = 1;
                if (historico[i].URL.length > 0) {
                  for (a = 0; a < historico[i].URL.length; a++) {
                    anexoHistorico =
                      anexoHistorico +
                      '<li><a href="' +
                      historico[i].URL[a].Link +
                      '"> Anexo ' +
                      contHis +
                      " </a>";
                    contHis++;
                  }
                } else {
                  anexoHistorico = "Sem Anexos";
                }
                historicoAnotacao = historico[i].ANOTACAO.replace(
                  /(?:\r\n|\r|\n)/g,
                  "<br />"
                );
                historicoAnotacao = historicoAnotacao.replace(
                  "[NOTA SOLUÇÃO:",
                  "<br />[NOTA SOLUÇÃO"
                );
                $(".sucessoPesquisarProtocolo").append(
                  `<div class="row">
                  <h6 class="left">Movimento #${movimento}</h6>
                  <table class="striped tablePesquisa responsive-table">
                    <tbody>
                      <tr>
                        <td>Data da Movimentação</td>
                        <td>${historico[i].DATA_CONTATO}</td>
                      </tr>
                      <tr>
                        <td>Movimentação</td>
                        <td>${historico[i].MOTIVO}</td>
                      </tr>
                      <tr>
                        <td>Descrição</td>
                        <td>${historicoAnotacao}</td>
                      </tr>
                      <tr>
                        <td>Anexos</td>
                        <td>
                          <ul>
                            <li>${anexoHistorico}</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>`
                );
              }
              $(".sucessoPesquisarProtocolo").append(
                `<div class="botoesPesquisarProtocolo center">
                    <a class="waves-effect waves-light btn btnPesquisarProtocolo red" onclick="encerrarManifestacao()"><i class="material-icons left">highlight_off</i>ENCERRAR MANIFESTAÇÃO</a>
                    <a class="waves-effect waves-light btn btnPesquisarProtocolo" onclick="novaMovimentacao()"><i class="material-icons right">add_circle</i>REALIZAR NOVA MOVIMENTAÇÃO</a>
                </div>
                <form id="formNovaMovimentacao" method="POST" enctype="multipart/form-data" class="novaMovimentacao center">
                  <input type="hidden" name="DOCUMENTO" VALUE="${documento}" />
                  <input type="hidden" name="PROTOCOLO" VALUE="${protocolo}" />
                  <div class="input-field col s12">
                    <textarea id="textarea2" name="ANOTACAO" class="materialize-textarea" data-length="120"></textarea>
                    <label for="textarea2">Digite a Texto para a Nova Manifestação</label>
                  </div>
                  <div class="file-field input-field">
                    <div class="btn">
                      <span>Anexo</span>
                      <input type="file" name="ARQUIVO" multiple/>
                    </div>
                    <div class="file-path-wrapper">
                      <input class="file-path validate" type="text" placeholder="Insira Um ou Mais Anexos se Necessário"/>
                    </div>
                  </div>
                  <button type="submit" class="buttonform btn waves-effect waves-light" name="submit" value="Enviar" form="formNovaMovimentacao">Enviar</button>
                </form>
                <form method="POST" id="formEncerrarManifestacao" enctype="multipart/form-data" class="encerrarManifestacao">
                  <div class="row center">
                    <h6>Pesquisa de Satisfação</h6>
                    <p>Prezado(a) ${nome} , por gentileza, numa escala de 1 a 5:</p>
                    <br />
                    <div class="col m6 center">
                      Avalie o Atendimento e Cordialidade<br />
                      <i onclick="trocaEstrelaAtendimento(this)" class="material-icons voto atendimento" data-atendimento="1">star_border</i>
                      <i onclick="trocaEstrelaAtendimento(this)" class="material-icons voto atendimento" data-atendimento="2">star_border</i>
                      <i onclick="trocaEstrelaAtendimento(this)" class="material-icons voto atendimento" data-atendimento="3">star_border</i>
                      <i onclick="trocaEstrelaAtendimento(this)" class="material-icons voto atendimento" data-atendimento="4">star_border</i>
                      <i onclick="trocaEstrelaAtendimento(this)" class="material-icons voto atendimento" data-atendimento="5">star_border</i>
                    </div>
                    <div class="col m6 center">
                      Avalie a Solução da Manifestação<br />
                      <i onclick="trocaEstrelaSolucao(this)" class="material-icons voto solucao" data-solucao="1">star_border</i>
                      <i onclick="trocaEstrelaSolucao(this)" class="material-icons voto solucao" data-solucao="2">star_border</i>
                      <i onclick="trocaEstrelaSolucao(this)" class="material-icons voto solucao" data-solucao="3">star_border</i>
                      <i onclick="trocaEstrelaSolucao(this)" class="material-icons voto solucao" data-solucao="4">star_border</i>
                      <i onclick="trocaEstrelaSolucao(this)" class="material-icons voto solucao" data-solucao="5">star_border</i>
                    </div>
                    <button type="submit" class="buttonform btn waves-effect waves-light" name="submit" value="Enviar" form="formEncerrarManifestacao">Enviar</button>
                  </div>
                </form>`
              );
              if (cadastro.STATUS == "F") {
                $(".botoesPesquisarProtocolo").remove();
              }
              $(document).ready(function () {
                $("#formEncerrarManifestacao").submit(function (e) {
                  e.preventDefault();
                  $("#formEncerrarManifestacao").toggle();
                  $(".loaderEncerrarManifestacao").toggle();
                  var dataEncerrar = new FormData(
                    $("#formEncerrarManifestacao")[0]
                  );
                  dataEncerrar.append("CHAVE", "Y2F1YnIyMDE4");
                  dataEncerrar.append("DOCUMENTO", documento);
                  dataEncerrar.append("PROTOCOLO", protocolo);
                  dataEncerrar.append("ATENDIMENTO", notaAtendimento);
                  dataEncerrar.append("SOLUCAO", notaSolucao);
                  $.ajax({
                    type: "POST",
                    url: "https://caubr.aloatendimento.com.br/api/alo/encerrar",
                    data: dataEncerrar,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                      console.log(response);
                      if (response.status == "OK") {
                        alert(
                          'Manifestação Encerrada, clique em "OK" para ser redirecionado para a página principal da Ouvidoria.'
                        );
                        window.location.href =
                          "https://www.caubr.gov.br/91588-2/";
                      }
                    },
                    error: function (xhr, status, error) {
                      console.log(error);
                      alert("Ocorreu um Erro. Tente novamente.");
                    },
                  });
                  return false;
                });
              });
              $(document).ready(function () {
                $("#formNovaMovimentacao").submit(function (e) {
                  e.preventDefault();
                  $("#formNovaMovimentacao").toggle();
                  $(".loaderNovaManifestacao").toggle();
                  var dataNova = new FormData($("#formNovaMovimentacao")[0]);
                  dataNova.append("CHAVE", "Y2F1YnIyMDE4");
                  $.ajax({
                    type: "POST",
                    url: "https://caubr.aloatendimento.com.br/api/alo/reabrir",
                    data: dataNova,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                      console.log(response);
                      if (response.status == "OK") {
                        alert(
                          'Nova Movimentação Cadastrada! Clique em "OK" para ser redirecionado para a página principal da Ouvidoria.'
                        );
                        window.location.href =
                          "https://www.caubr.gov.br/91588-2/";
                      }
                    },
                    error: function (xhr, status, error) {
                      console.log(error);
                      alert("Ocorreu um Erro. Tente novamente.");
                    },
                  });
                  return false;
                });
              });
            },
          });
        },
        error: function (xhr, status, error) {
          alert(xhr.responseText);
        },
      });
    }, 3000);
    return false;
  });
});
