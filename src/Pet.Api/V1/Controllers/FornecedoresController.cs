using AutoMapper;
using Dev.Domain.Interfaces;
using Dev.Domain.Models;
using DevIO.Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pet.Api.Controllers;
using static Pet.Api.Extensions.CustomAuthorization;

namespace Pet.Api.V1.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/fornecedores")]
    public class FornecedoresController : MainController
    {
        private readonly IMapper _mapper;
        private readonly IFornecedorService _fornecedorService;
        //private readonly IEnderecoRepository _enderecoRepository;
        private readonly IFornecedorRepository _fornecedorRepository;

        public FornecedoresController(
            IMapper mapper, IUser user,
            INotificador notificador,
            IFornecedorService fornecedorService,
            //IEnderecoRepository enderecoRepository,
            IFornecedorRepository fornecedorRepository) : base(notificador, user)
        {
            _mapper = mapper;
            _fornecedorService = fornecedorService;
            //_enderecoRepository = enderecoRepository;
            _fornecedorRepository = fornecedorRepository;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FornecedorViewModel>>> ObterTodos()
        {
            // Converte o o model fornecedor para fornecedorViewModel.
            var fornecedores = _mapper.Map<IEnumerable<FornecedorViewModel>>(await _fornecedorRepository.ObterTodos());
            return Ok(fornecedores); //200 Ok
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<FornecedorViewModel>> ObterPorId(Guid id)
        {
            // Converte o o model fornecedor para fornecedorViewModel.
            var fornecedor = await ObterFornecedorPorIdProdutos(id);

            if (fornecedor == null) return NotFound(); //404 não encontrado.

            return Ok(fornecedor); //200 Ok
        }

        [ClaimsAuthorize("Fornecedor", "Adicionar")]
        [HttpPost]
        public async Task<ActionResult<FornecedorViewModel>> Adicionar(FornecedorViewModel fornecedorViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _fornecedorService.Adicionar(_mapper.Map<Fornecedor>(fornecedorViewModel));

            return CustomResponse(fornecedorViewModel);
        }

        [ClaimsAuthorize("Fornecedor", "Atualizar")]
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<FornecedorViewModel>> Atualizar(Guid id, FornecedorViewModel fornecedorViewModel)
        {
            if (id != fornecedorViewModel.Id)
            {
                NotificarErro(mensagem: "O id informado não é o mesmo que foi passado  na query");
                return CustomResponse(fornecedorViewModel);
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _fornecedorService.Atualizar(_mapper.Map<Fornecedor>(fornecedorViewModel));

            return CustomResponse(fornecedorViewModel);
        }

        [ClaimsAuthorize("Fornecedor", "Excluir")]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<FornecedorViewModel>> Excluir(Guid id)
        {
            var fornecedorViewModel = await ObterFornecedorPorId(id);

            if (fornecedorViewModel == null) return NotFound();

            await _fornecedorService.Remover(id);

            //return Ok(fornecedorViewModel);
            return CustomResponse(fornecedorViewModel);
        }

        private async Task<FornecedorViewModel> ObterFornecedorPorIdProdutos(Guid id)
        {
            return _mapper.Map<FornecedorViewModel>(await _fornecedorRepository.ObterFornecedorPorIdProdutos(id));
        }

        private async Task<FornecedorViewModel> ObterFornecedorPorId(Guid id)
        {
            return _mapper.Map<FornecedorViewModel>(await _fornecedorRepository.ObterFornecedorPorId(id));
        }


    }
}
