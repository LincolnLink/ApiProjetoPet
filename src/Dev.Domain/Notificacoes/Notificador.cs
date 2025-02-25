﻿using Dev.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dev.Domain.Notificacoes
{
    public class Notificador : INotificador
    {
        /// <summary>
        /// Uma lista de notificações.
        /// </summary>
        private List<Notificacao> _notificacoes;

        /// <summary>
        /// O construtor recebe uma lista de notificações vazio.
        /// </summary>
        public Notificador()
        {
            _notificacoes = new List<Notificacao>();
        }

        /// <summary>
        /// Adiciona a notificação na lista. 
        /// </summary>        
        public void Handle(Notificacao notificacao)
        {
            _notificacoes.Add(notificacao);
        }

        /// <summary>
        /// Retorna a lista de notificação.
        /// </summary>        
        public List<Notificacao> ObterNotificacoes()
        {
            return _notificacoes;
        }

        /// <summary>
        /// Retorna se existe notificações na lista.
        /// </summary>        
        public bool TemNotificacao()
        {
            return _notificacoes.Any();
        }
    }
}
