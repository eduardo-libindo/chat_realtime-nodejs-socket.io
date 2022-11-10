var socket = io.connect();

$("form#chat").submit(function (e) {
  e.preventDefault();

  var mensagem = $(this).find("#texto_mensagem").val();
  var usuario = $("#lista_usuarios").val();

  socket.emit("enviar mensagem", { msg: mensagem, usu: usuario }, function () {
    $("form#chat #texto_mensagem").val("");
  });
});

socket.on("atualizar mensagens", function (dados) {
  var mensagem_formatada = $("<p />").text(dados.msg).addClass(dados.tipo);
  $("#historico_mensagens").append(mensagem_formatada);
});

$("form#login").submit(function (e) {
  e.preventDefault();

  socket.emit("entrar", $(this).find("#apelido").val(), function (valido) {
    if (valido) {
      $("#acesso_usuario").hide();
      $("#sala_chat").show();
    } else {
      $("#acesso_usuario").val("");
      alert("Nome já utilizado nesta sala");
    }
  });
});

socket.on("atualizar usuarios", function (usuarios) {
  $("#lista_usuarios").empty();
  $("#lista_usuarios").append("<option value=''>Usuarios On-line</option>");
  $.each(usuarios, function (indice) {
    var opcao_usuario = $("<option />").text(usuarios[indice]);
    $("#lista_usuarios").append(opcao_usuario);
  });
});