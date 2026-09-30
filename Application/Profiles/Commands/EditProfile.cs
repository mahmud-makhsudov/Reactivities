using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands
{
    public class EditProfile
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string DisplayName { get; set; }
            public string? Bio { get; set; }
        }

        public class Handler(IUserAccessor userAccessor, AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();

                if (user.DisplayName == request.DisplayName && user.Bio == request.Bio)
                    return Result<Unit>.Failure("No changes were made to the profile", 400);

                user.DisplayName = request.DisplayName;
                if (request.Bio != null) user.Bio = request.Bio;

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Problem updating profile", 400);
            }
        }
    }
}